angular.module('nailApp', ['ui.router', 'app.controllers'])

.config(function($stateProvider, $urlRouterProvider){
  

  $stateProvider

  .state('home', {
    url: "/home",    
    templateUrl: "home.html"
  })
  
  .state('services', {
    url: "/services",    
    templateUrl: "services.html"    
  })
  
  .state('terms', {
    url: "/terms",    
    templateUrl: "terms.html"    
  })
  
  .state('consent', {
    url: "/consent",    
    templateUrl: "consent.html"    
  })
  
  .state('lash', {
    url: "/lash",    
    templateUrl: "lash.html"    
  })
  
  .state('microblade', {
    url: "/microblade",    
    templateUrl: "microblade.html"    
  })
  
  .state('team', {
    url: "/team",    
    templateUrl: "team.html"    
  })
  
  .state('gallery', {
    url: "/gallery",    
    templateUrl: "gallery.html"    
  })
  
  .state('coupon', {
    url: "/coupon",    
    templateUrl: "coupon.html"    
  })
  
  .state('employment', {
    url: "/employment",    
    templateUrl: "employment.html"    
  })
  
  .state('appointment', {
    url: "/appointment",    
    templateUrl: "appointment.html",
    controller: 'appointmentController'
  })
  
  .state('booking', {
    url: "/booking",    
    templateUrl: "booking.html"    
  })
  
  .state('calendar', {
	  url: "/calendar",
	  templateUrl: "calendar.html",
	  controller: "calendarController"
  })
  
  
  
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

})

