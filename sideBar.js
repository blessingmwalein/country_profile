  //creating the vue app instance
  window.onload = function () {
     new Vue({
      el: '#side-bar-app',
      data() {
         return {
            currentView: 'side-bar',
            capital:"masvingo",
            country_data:{},
            loading:true
         }
      },
      computed:{},
      mounted(){
          this.getCountryCode("Zimbabwe")
      },
      methods: {
         search(){
            
            console.log(document.getElementById('query_text').value)
            
            var countries_results = countries.filter(function(country) {
            return country.name.includes(document.getElementById('query_text').value);
            });
        
            console.log(countries_results)
            getData()
        },
        
       getData(country_code){
            this.loading = true
            fetch('http://api.geonames.org/countryInfoJSON?formatted=true&lang=it&country='+country_code+'&username=blessingmwalein&style=full')
            .then( function( response ){
                if( response.status != 200 ){
                    this.loading = false
                    console.log( response.status );
                }else{
                    response.json().then( function( data ){
                        this.response = data;
                        this.country_data = data
                        console.log(data)
                        this.loading = false
                        location_population = data.geonames[0].population
                    }.bind(this));
                }
            }.bind(this))
        },
        
        getCountryCode(countryName){
          
            var countries_results = countries.filter(function(country) {
              return country.name.includes(countryName);
            });
        
            var code = countries_results[0].code.toLowerCase();
        
            this.getData(code)
        }
      }
    });
  }