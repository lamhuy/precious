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
  
  .state('appointment', {
    url: "/appointment",    
    templateUrl: "appointment.html",
    controller: 'appointmentController'
  })
  
  .state('calendar', {
	  url: "/calendar",
	  templateUrl: "calendar.html",
	  controller: "calendarController"
  })
  
  
  
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

})

