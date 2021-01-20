var countryDetails;
function search(){
    
    console.log(document.getElementById('query_text').value)
    
    var countries_results = countries.filter(function(country) {
    return country.name.includes(document.getElementById('query_text').value);
    });
    getData(countries_results[0].code.toLowerCase())

    const anotherEvent = new CustomEvent('search', {
      data:getData(countries_results[0].code.toLowerCase())
    })
}

function getCities(county_name){
  var cities_results = cities.filter(function(city) {
     return city.country.includes(county_name)
  })

  return cities_results

}

function getData(country_code){
    this.loading = true
    fetch('http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&country='+country_code+'&username=blessingmwalein&style=full')
    .then( function( response ){
        if( response.status != 200 ){
            this.loading = false
            console.log( response.status );
        }else{
            response.json().then( function( data ){
                this.response = data;
                return data   
            }.bind(this));
        }
    }.bind(this))
 }

