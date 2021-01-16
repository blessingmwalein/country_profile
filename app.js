
Vue.component('population', {
  template: '#population',
  data(){
      return {
 
    }
  },

  methods: {
    
   
  }
})

Vue.component('economy', {
  template: '#economy',
  data(){
      return {
 
    }
  },

  methods: {
    
   
  }
})



Vue.component('history', {
  template: '#history',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})


Vue.component('links', {
  template: '#links',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})


Vue.component('covid', {
  template: '#covid',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})


Vue.component('continent', {
  template: '#continent',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})



Vue.component('area-covered', {
  template: '#area-covered',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})

Vue.component('location', {
  template: '#location',
  data(){
      return {
 
    }
  },
  
  methods: {
    
   
  }
})



//creating the vue app instance

window.onload = function () {
   new Vue({
    el: '#app',
    data: {
      currentView: 'population',
      isPopulation:true,
      isEconomy:false,
      isHistory:false,
      isLinks:false,
      isCovid:false,
      isContinent:false,
      isArea:false,
      isLocation:false
    },
    methods: {
       population(){
        this.currentView ='population'
        this.isPopulation = true,
        this.isHistory = false,
        this.isEconomy = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       history(){
        this.currentView ='history'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = true,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       links(){
        this.currentView ='links'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = true,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       covid(){
        this.currentView ='covid'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = true,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false
       },
       continent(){
        this.currentView ='continent'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = true,
        this.isArea = false,
        this.isLocation = false
       },
       area(){
        this.currentView ='area-covered'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = true,
        this.isLocation = false
       },
       location(){
        this.currentView ='location'
        this.isPopulation = false,
        this.isEconomy = false,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = true
       },
       economy(){
        this.currentView ='economy'
        this.isPopulation = false,
        this.isEconomy = true,
        this.isHistory = false,
        this.isLinks = false,
        this.isCovid = false,
        this.isContinent = false,
        this.isArea = false,
        this.isLocation = false

        console.log(this.currentView)
       }

    }
  });
}