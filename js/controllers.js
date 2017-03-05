angular.module('app.controllers', ['app.factories'])

.controller('calendarController', [ '$scope', 'googleFactory', function($scope, googleFactory) {
	
	$scope.oauth = function(){
		var token = null;
		googleFactory.getToken().then(function (token){
			token = token;
			console.info("Controller got token: ", token);	
		}, function error(error){
			console.info("ERROR: ", error);
		});
		
	}
	
	
	$scope.listCalendar = function(){
		console.info("List Calendar: ", googleFactory.listCalendar());
	}
	
	
	$scope.insertCalendar = function(){
		console.info("Insert Calendar: ", googleFactory.insertCalendar());
	}
	
	$scope.deleteCalendar = function(){
		console.info("Delete Calendar: ", googleFactory.deleteCalendar());
	}
	
	$scope.listACL = function(){
		console.info("List ACL: ", googleFactory.listACL());
	}
	
	$scope.insertACL = function(){
		console.info("insert ACL: ", googleFactory.insertACL());
	}
	
	$scope.listEvents = function(){
		console.info("listEvents: ", googleFactory.listEvents());
	}
	
	$scope.createEvent = function(){
		console.info("createEvent: ", googleFactory.createEvent());
	}
	
	$scope.freeBusy = function(){
		var cal = "ou4be600h5vnsaabcfn4hiu4ps@group.calendar.google.com";
		
		var startTime = new Date("2016-05-21T14:00:00Z");
		var endTime = new Date("2016-05-21T15:00:00Z");
		
		googleFactory.freeBusy(cal, startTime, endTime).then(function(result){
			console.info("BOOKED: ", result);
		}, function(error){
			console.info("UNAVAILABLE: ", error);
		});
	}


}
])
.controller('appointmentController', [ '$scope', 'googleFactory', function($scope, googleFactory) {
	$scope.list = [];
	$scope.text = 'hello';
	$scope.validCaptcha = false;
	$scope.customer = {
			userNote: '* required fields'
	};

	$scope.recaptchaCallback = function (){
		$scope.$apply(function(){
			$scope.validCaptcha = true;			
		});
	}
	
	//map a windown function to angularjs function
	window.recaptchaCallback = $scope.recaptchaCallback;
	

	
	 
	 var date = new Date(); 
	 var year = date.getFullYear(); 
	 var month = date.getMonth(); 
	 month=month+1; 
	 if (month < 10) 
	 month = "0" + month; 
	 var day= date.getDate(); 
	 if (day < 10) 
	 day = "0" + day; 
	 var datestring=year+month+day; 
	 var style = "style='border-width:0' width='100%' height='400' frameborder='0' scrolling='no'";
	 var modeStr = "showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showTitle=0&amp;mode=DAY";
	 var formatStr = "height=400&amp;wkst=7&amp;bgcolor=%23ffffff";
	 var timezoneStr = "ctz=America%2FNew_York";
	 var holidayCal = "&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23125A12";
	 var storeCal  = "<iframe src='https://calendar.google.com/calendar/embed?title=Salon%20Calendar&amp;showTitle=0&amp;"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;"+"" +
	 				  "src=preciousnailspaleesburg%40gmail.com&amp;color=%2342104A&amp;"+
	 				  "src=qe8pc257tvf92lnoturhk5am2g%40group.calendar.google.com&amp;color=%23182C57&amp;"+
	 				  "src=ou4be600h5vnsaabcfn4hiu4ps%40group.calendar.google.com&amp;color=%238C500B&amp;"+
	 				  "src=9nsm4d1u2sc3e4d83ljqblp0ko%40group.calendar.google.com&amp;color=%236B3304&amp;"+
	 				  "src=lluucq43j03ljbh4bdmq7k6r0s%40group.calendar.google.com&amp;color=%23711616&amp;"+
	 				  "src=pm8nap4abs8rjsngp1gnhkq9o0%40group.calendar.google.com&amp;color=%23AB8B00&amp;"+
	 				  "src=g85bbb52t5r8uljto960efvguo%40group.calendar.google.com&amp;color=%230F4B38&amp;"+
	 				  "src=o615idd20iucgfccfdvhj575mo%40group.calendar.google.com&amp;color=%235F6B02&amp;"+
	 				  timezoneStr+"'"+ style+"></iframe>";
	 
	 
	 var kathyCal  = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=ou4be600h5vnsaabcfn4hiu4ps%40group.calendar.google.com&amp;color=%238C500B&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var annCal    = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=qe8pc257tvf92lnoturhk5am2g%40group.calendar.google.com&amp;color=%23182C57&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var tinaCal   = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=o615idd20iucgfccfdvhj575mo%40group.calendar.google.com&amp;color=%235F6B02&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var mimiCal   = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=pm8nap4abs8rjsngp1gnhkq9o0%40group.calendar.google.com&amp;color=%23AB8B00&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var leeCal    = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=9nsm4d1u2sc3e4d83ljqblp0ko%40group.calendar.google.com&amp;color=%236B3304&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var lisaCal   = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=lluucq43j03ljbh4bdmq7k6r0s%40group.calendar.google.com&amp;color=%23711616&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var stevenCal = "<iframe src='https://calendar.google.com/calendar/embed?"+ modeStr +"&amp;dates="+datestring+"/"+datestring+"&amp;"+formatStr+"&amp;src=g85bbb52t5r8uljto960efvguo%40group.calendar.google.com&amp;color=%230F4B38&amp;"+timezoneStr+"'"+ style+"></iframe>";
	 var calendarFrame = storeCal;
	 var calendarName = "Precious Calendar";
	 $("div#embeddedCalendar").html(calendarFrame);
	 //<iframe src='https://calendar.google.com/calendar/embed?title=Salon%20Calendar&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=DAY&amp;dates="+datestring+"/"+datestring+"&amp;height=400&amp;wkst=7&amp;bgcolor=%23FFFFFF&amp;src=287eis6r1vnhmfb1nbddvnt534%40group.calendar.google.com&amp;color=%232952A3&amp;src=kfk9benidsi97v17pin5dj00q4%40group.calendar.google.com&amp;color=%2328754E&amp;ctz=America%2FNew_York' style='border-width:0' width='100%' height='400' frameborder='0' scrolling='no'></iframe>
	  
	 
	 /* <iframe src="https://calendar.google.com/calendar/embed?title=Salon%20Calendar&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=DAY&amp;height=400&amp;wkst=7&amp;bgcolor=%23FFFFFF&amp;src=287eis6r1vnhmfb1nbddvnt534%40group.calendar.google.com&amp;color=%232952A3&amp;src=kfk9benidsi97v17pin5dj00q4%40group.calendar.google.com&amp;color=%2328754E&amp;ctz=America%2FNew_York" style="border-width:0" width="100%" height="400" frameborder="0" scrolling="no"></iframe> */
	 
	 
	 
	 //listen to technician drop down changes, load a different calendar view
	 $scope.updateCal = function(){
		console.info("Selected: ", $scope.customer.tech);
		
		if($scope.customer.tech == "Kathy"){
			calendarFrame = kathyCal;
			calendarName = "Kathy Calendar";
		}else if($scope.customer.tech == "Ann"){
			calendarFrame = annCal;
			calendarName = "Ann Calendar";
		}else if($scope.customer.tech == "Tina"){
			calendarFrame = tinaCal;
			calendarName = "Tina Calendar";
		}else if($scope.customer.tech == "Mimi"){
			calendarFrame = mimiCal;
			calendarName = "Mimi Calendar";
		}else if($scope.customer.tech == "Lisa"){
			calendarFrame = lisaCal
			calendarName = "Lisa Calendar";
		}else if($scope.customer.tech == "Lee"){
			calendarFrame = leeCal;
			calendarName = "Lee Calendar";
		}else if($scope.customer.tech == "Steven"){
			calendarFrame = stevenCal;
			calendarName = "Steven Calendar";
		}else{
			calendarFrame = storeCal;
			calendarName = "Precious Calendar";
		}
		console.info("Calender Frame: ", calendarFrame);
		$("div#embeddedCalendar").html(calendarFrame);
		$("h2#calendarName").html("<span class=\"fa fa-calendar\"/> " + calendarName);
	 }
	 
	 
	$scope.submit = function() {
		console.info("request info: ", $scope.customer);
		
	/*	$.ajax({
		    type: 'POST',
		    // make sure you respect the same origin policy with this url:
		    // http://en.wikipedia.org/wiki/Same_origin_policy
		    url: 'http://corvusanalytics.com/salon/mail_handler.php',
		    data: $scope.customer,
		    success: function(){
		    	console.info("Email sent!");
		    	alert("Thank you! Your request has been submitted");
		    	//clear form and display acknowledgement
		    	$scope.$apply(function(){
		    		$scope.customer = {
		    			userNote: '* required fields'
					};		
				});
		    	
				

		    }
		});*/
		
		
		googleFactory.createEvent($scope.customer).then(function(result){
			console.info("Successfully created event", result);
			bootbox.alert("Appointment confirmed for " + result.attendees[0].displayName + ". Email will be sent shortly");
			$("div#embeddedCalendar").html(calendarFrame);
			/*Object {kind: "calendar#event", etag: ""2927257893974000"", 
			id: "g901fjvdm9qh9t0ag8l5qr3nqk", status: "confirmed", 
			htmlLink: "https://www.google.com/calendar/event?eid=ZzkwMWZq…DVxcjNucWsgbzYxNWlkZDIwaXVjZ2ZjY2ZkdmhqNTc1bW9AZw"…}
			*/
			//pop up modal
		}, function(error){
			console.info("Error creating event: ", error);
			if(error.length > 0){
				bootbox.alert("The time slot is unavailable. Please select a different time. Thank you");
			}else{
				bootbox.alert("We are experience some problem with our online booking. Please call us to book");
			}
			
		});
	};
}
])
.controller('contactController', [ '$scope', function($scope) {
	$scope.validCaptcha = false;

	$scope.recaptchaCallback = function (){
		$scope.$apply(function(){
			$scope.validCaptcha = true;			
		});
	}
	
	//map a windown function to angularjs function
	window.recaptchaCallback = $scope.recaptchaCallback;
}]);