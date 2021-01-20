var location_population = "";

(function ($) {
    "use strict";
    
    //function for initial map
    function mainMap() {

        //initial map settings
        var map = new google.maps.Map(document.getElementById('map-main'), {
            zoom: 6,
            scrollwheel: false,
            center: new google.maps.LatLng(-17.8216, 31.0492),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: 'cooperative',
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }]
        });

        //getting geo data for the current location using geo coding api 
        var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (p) {
                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                console.log(LatLng);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map.setOptions(mapOptions);
                geocoder.geocode({
                    'location': LatLng
                }, function (results, status) {
                    console.log("geocoder callback status=" + status);
                    if (status === 'OK') {
                        if (results[0]) {
                            map.setZoom(11);
                            // from "Google maps API, get the users city/ nearest city/ general area"
                            // https://stackoverflow.com/questions/50081245/google-maps-api-get-the-users-city-nearest-city-general-area
                            var details = results[0].address_components;
                            var city;
                            var country;
                            var short_name;
                            var city_short;
                            console.log(JSON.stringify(details));
                            //looping though data from geocoding api 

                            for (var i = details.length - 1; i >= 0; i--) {
                                for (var j = 0; j < details[i].types.length; j++) {
                                    if (details[i].types[j] == 'locality') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'sublocality') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'neighborhood') {
                                        city = details[i].long_name;
                                    } else if (details[i].types[j] == 'postal_town') {
                                        city = details[i].long_name;
                                        console.log("postal_town=" + city);
                                    } else if (details[i].types[j] == 'administrative_area_level_2') {
                                        city = details[i].long_name;
                                        city_short = details[i].short_name
                                        console.log("admin_area_2=" + city);
                                    }
                                    // from "google maps API geocoding get address components"
                                    // https://stackoverflow.com/questions/50225907/google-maps-api-geocoding-get-address-components
                                    if (details[i].types[j] == "country") {
                                        country = details[i].long_name;
                                        short_name = details[i].short_name
                                    }
                                }
                            }
                            //defination of async function to fetch data from open weather to get weather data
                            !async function(){
                                let data = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city_short.toLowerCase()+'&appid=eea4f5577890e213e7cd6c3b6ae6b488')
                                    .then((response) => response.json())
                                    .then(data => {
                                        return data;
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });

                                    //setting default maker for current location 
                                    var marker = new google.maps.Marker({
                                        position: LatLng,
                                        map: map,
                                        title: '<div class="map-popup-wrap"><div class=""><div class="features-box"> <div class="widget-posts-descr">  <div class="geodir-category-location fl-wrap"><a href="#"><i class="fas fa-map-marker-alt"></i>'+city + (short_name)+'</a></div> <div class="widget-posts-descr-link"><a href="">Lat :'+ p.coords.latitude +'</a> </div> <div class="widget-posts-descr-link"><a href="">Long :'+  p.coords.longitude+'</a> </div> <div class="widget-posts-descr-link"><a href="" id="marker-population">Population : '+location_population+'</a> </div><div class="widget-posts-descr-link"><a href="">Humidity :'+data.main.humidity+'%</a> </div><div class="widget-posts-descr-link"><a href=""> Temperature :'+data.main.temp+' K</a> </div></div></div></div></div>'
                                    });
                                    //setting event listiner for the marker click
                                    google.maps.event.addListener(marker, "click", function (e) {
                                        var infoWindow = new google.maps.InfoWindow();
                                        infoWindow.setContent(marker.title);
                                        infoWindow.open(map, marker);
                                    });
                                    google.maps.event.trigger(marker, 'click');

                                    //looping through all cities in a country adding marker
                                    for (var i =0; i < getCities(country).length; i++) {

                                        addMyMarker({lat:getCities(country)[i].lat,lng:getCities(country)[i].lng},'<div class="map-popup-wrap"><div class=""><div class="features-box"> <div class="widget-posts-descr">  <div class="geodir-category-location fl-wrap"><a href="#"><i class="fas fa-map-marker-alt"></i>'+getCities(country)[i].city + (getCities(country)[i].iso2)+'</a></div> <div class="widget-posts-descr-link"><a href="">Lat :'+ getCities(country)[i].lat +'</a> </div> <div class="widget-posts-descr-link"><a href="">Long :'+  getCities(country)[i].lat+'</a> </div> <div class="widget-posts-descr-link"><a href="" id="marker-population">Population : '+getCities(country)[i].population+'</a> </div><div class="widget-posts-descr-link"><a href="">Humidity :'+data.main.humidity+'%</a> </div><div class="widget-posts-descr-link"><a href=""></a> </div></div></div></div></div>',map) 
                                    }     
                                    console.log(data);
                                }();

                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            });
        } else {
            alert('Geo Location feature is not supported in this browser.');
        }


        // var polygon = new google.maps.Polygon({
        //   paths:delimiters,
        //   strokeColor: '#FF000',
        //   strokeOpity:0.8,
        //   strokeWeight:3,
        //   fillColor:'#ff0000',
        //   fillOpacity:0.35
        // });

        // polygon.setMap(map)

        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-150, -55),
            zIndex: null,
            boxStyle: {
                width: "300px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };

        var markerCluster, overlay, i;
        var allMarkers = [];

        var clusterStyles = [
            {
                textColor: 'white',
                url: '',
                height: 50,
                width: 50
            }
        ];

        //map navigation functions to move around the map
        $('.map-item').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
            google.maps.event.trigger(allMarkers[marker_index - 1], "click");
            if ($(window).width() > 1064) {
                if ($(".map-container").hasClass("fw-map")) {
                    $('html, body').animate({
                        scrollTop: $(".map-container").offset().top + "-110px"
                    }, 1000)
                    return false;
                }
            }
        });
        $('.nextmap-nav').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], 'click');
            } else {
                google.maps.event.trigger(allMarkers[0], 'click');
            }
        });
        $('.prevmap-nav').on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof (currentInfobox) == "undefined") {
                google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], 'click');
                }
            }
        });

        // Scroll enabling button
        var scrollEnabling = $('.scrollContorl');

        $(scrollEnabling).click(function (e) {
            e.preventDefault();
            $(this).toggleClass("enabledsroll");

            if ($(this).is(".enabledsroll")) {
                map.setOptions({ 'scrollwheel': true });
            } else {
                map.setOptions({ 'scrollwheel': false });
            }
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);
        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }
        // Geo Location Button
        $(".geoLocation, .input-with-icon.location a").on("click", function (e) {
            e.preventDefault();
            geolocate();
        });


        //function to find the current location
        function geolocate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.setCenter(pos);
                    map.setZoom(12);

                    var avrtimg = $(".avatar-img").attr("data-srcav");
                    var markerIcon3 = {
                        url: avrtimg,
                    }
                    var marker3 = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon: markerIcon3,
                        title: 'Your location'
                    });
                    var myoverlay = new google.maps.OverlayView();
                    myoverlay.draw = function () {
                        // add an id to the layer that includes all the markers so you can use it in CSS
                        this.getPanes().markerLayer.id = 'markerLayer';
                    };
                    myoverlay.setMap(map);
                });
            }
        }
    }

    // function to add marker
    function addMyMarker(coords, content,map ){
        var marker = new google.maps.Marker({
          position:coords,
          map:map,
          //icon:props.iconImage
        });

          var infoWindow = new google.maps.InfoWindow({
            content:content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
    
    // -------------- Custom Map Marker / End -------------- //	

    var head = document.getElementsByTagName('head')[0];

    // Save the original method
    var insertBefore = head.insertBefore;

    // Replace it!
    head.insertBefore = function (newElement, referenceElement) {

        if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
            return;
        }

        insertBefore.call(head, newElement, referenceElement);
    };

    var map = document.getElementById('map-main');
    if (typeof (map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }
})(this.jQuery);