'use strict';

angular.module('app.factories', [])

.factory('googleToken', [ '$q', function($q) {
	//constants specific to precious nail
	var pHeader = {"alg":"RS256","typ":"JWT"}
	var sHeader = JSON.stringify(pHeader);
	var pClaim = {};
	pClaim.aud = "https://www.googleapis.com/oauth2/v4/token";
	pClaim.scope = "https://www.googleapis.com/auth/calendar";
	pClaim.iss = "precious@corvusanalyticssalon.iam.gserviceaccount.com";
	var key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4ek6hmXa2yhpu\nBwXFS7rfWN8qmqSFue6c3X4342WIw9+Oivef0IAdojeL4UG6mud2TvLZ6T8SEXmz\nnNxWBEeF3Esxd4UQ6sGSjYZCdasYcRZcOq+1sLm6UMMAgohROFdQ2ynAQyT/3/5B\nM4XB7I8p7BmkuZFSSe522E7KYsOAuCseVMo97ETeFbj521W277n5Qu5WT7HNJvD2\ncSHj/XzGNNjV9pVm+JFLPU+a897LLPe623MRh6GkuAkjeFLEq6r6QlXIjcPQ5/Cq\nhZhH2tq9nw+kjojjguOFm/k8tPUstCD+IIcfSJfT558FBaWN6NFpgvW+ly8gz0w9\nsumIWt57AgMBAAECggEAQNT6/V/pkKPGVhSxuny61/NrupVObJDDgu10hj+sVzw/\nPOEp1Uh5PfDchJRNfT8jSTjFsD+AouDxXGYsKS6n1CtvYZsXcLKQBOkn3gNsddKI\ngTE+vyO0of3wCiXVsnWSeiALtD3kqugVeuSYhWaVia4n9PQiVkEVRT8PsaC0BHAa\n1vBtSErtzf6243xTE6h9rCZEfjDsQVt0616OVf9PH2kMqWiiiZx0sNIZMJ28qpih\nIZOjPJA/J6tPeicimse5yhRhlhU3SHTxSjpa6OYdGOuZR4kUHAIiB0ynC1cTs3TJ\nv/XBK/Q3F58WpLUpsFNJDPqyQdVANNfYVNCEB9tlgQKBgQD4iqd7Zhc7x97x73NK\nkqQ7rpks1r9GTofONix0BlrGu4C+hvaXTboVMtYZOV4Wq0OdGJ4RRXTjWR/AfnjU\n1aERmzx7uuk0LdS0sCzpaUEEWo0JYmad9lQvBsOywdXfOWIE6Ue/puylz7bxBTRz\nQn+vWySFd5nXa6JJwxHvcgn9qQKBgQC+A4ByDB1ZMXZNBK4KEy7B6HOvfKiUMcxT\nffwDRF01NhguYIwWFPyz95rw/lzQerqKcrQgFU3sLceCeHbyfHyh4y2O44IW6OtK\nNtw6K67YQ9oRyHzLqLvXsRliC5CUi0d4apIqECybMCMBXSP/o2LN72IXwHWg3Yt5\nUB2iDW4pgwKBgCe7msy6ZGp1KGoK+qZoTQMRhYFKj2eA9Gr99BtUTLzKiulqkA9e\nKKps5xc/OZBsLrH1lodyUB5sSAww68YypL44z/GDzvY9gWylYXirD+7PPw7KAVet\nYoXmEfEI1dUKymW4mXTFDb3wN/HOADWQ4vK4ol0H4rsyhM4/9iUOWRSJAoGAPSrR\naWU++Vxz0b1E7VdZgPB8dSxy9CnHtcTjoIWcX6nHRP6tedpNsv1tMlEfvbkUXcco\n9v8Es5fVFsoCuHKciFyiaNISKZ/XRm+8mzk+sr288GaSzdjGh1uqaSaB51+ipT/h\nR4snYNmxGxpJoVyOTO7Xq/+3ng5TfLzunSEnqlMCgYEAtQLCF7S/TDym1Rj/L1NR\ng1W8bccsz9abvDl2ZllcFKR/p4mOir9X6FFUvq+LnzS3ng/9L4epzJB1lBpOCPUs\nFQ0YeyjdlyLT/s1btOdR4jNOPRrsZ/7PkFnE7EpRFdQMRD0HzlV60zWnwQHGaD92\ndcR0o4ULFqAXC9tThsq9ABU=\n-----END PRIVATE KEY-----\n";

	var googleToken = null;
	return {
		getToken: function(){
			var deferred = $q.defer();
			//if need to get a new token
			if(googleToken == null || pClaim.exp < KJUR.jws.IntDate.get("now")){
				pClaim.exp = KJUR.jws.IntDate.get("now") + 100;
				pClaim.iat = KJUR.jws.IntDate.get("now");
				var sClaim = JSON.stringify(pClaim);			
				var sJWS = KJUR.jws.JWS.sign("RS256", sHeader, sClaim, key);
					
				var param = {
						grant_type : "urn:ietf:params:oauth:grant-type:jwt-bearer",
						assertion: sJWS
					};	
				
				$.ajax({
				    type: 'POST',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/oauth2/v4/token',
				    data: param,
				    success: function(token){
				    	googleToken = token;
				    	console.info("New Token", token);
				    	deferred.resolve(googleToken);
				    },
				    error: function(error){
				    	deferred.reject(error);
				    }
				});
			}
			else{
				console.info("Get existing token, expire in: ", googleToken.expires_in);
				deferred.resolve(googleToken);
			}
			
			return deferred.promise;
		}
	}
}])
.factory('googleFactory', [ '$q', 'googleToken', function($q, googleToken) {
	
	
	var storeCal = "preciousnailspaleesburg@gmail.com";
	var kathyCal = "ou4be600h5vnsaabcfn4hiu4ps@group.calendar.google.com";
	var annCal = "qe8pc257tvf92lnoturhk5am2g@group.calendar.google.com";
	var tinaCal = "o615idd20iucgfccfdvhj575mo@group.calendar.google.com";
	var mimiCal = "pm8nap4abs8rjsngp1gnhkq9o0@group.calendar.google.com";
	var leeCal = "9nsm4d1u2sc3e4d83ljqblp0ko@group.calendar.google.com";
	var lisaCal = "lluucq43j03ljbh4bdmq7k6r0s@group.calendar.google.com";
	var stevenCal = "g85bbb52t5r8uljto960efvguo@group.calendar.google.com";
	
	
	return {		
		listCalendar: function(){
			
			googleToken.getToken().then(function(token){
				/**/
				var param = {
						access_token: token.access_token
				}
				$.ajax({
				    type: 'GET',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
				    data: param,
				    success: function(result){
				    	console.info("Calendars", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
			
			
			
			
		},
		insertCalendar: function(){
			googleToken.getToken().then(function(token){
				var d = new Date();
				/**/
				var param = {
					summary: 'Test_calendar_'+ d.getMilliseconds()
				}
				$.ajax({
				    type: 'POST',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/calendars',
				    contentType: "application/json; charset=UTF-8",
				    data: JSON.stringify(param),
				    beforeSend: function (xhr) {
		              /////   Authorization header////////
		                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
		            },
				    success: function(result){
				    	console.info("Calendars", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
		},
		deleteCalendar: function(){
			googleToken.getToken().then(function(token){
				var calendarid = prompt("Calendarid: ", "");
				$.ajax({
				    type: 'DELETE',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList/'+calendarid,
				    contentType: "application/json; charset=UTF-8",
				    beforeSend: function (xhr) {
		              /////   Authorization header////////
		                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
		            },
				    success: function(result){
				    	console.info("Calendars", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
		},
		listACL: function(){
			googleToken.getToken().then(function(token){
				var calendarid = prompt("Calendarid: ", "");
				/**/
				var param = {
						access_token: token.access_token
				}
				$.ajax({
				    type: 'GET',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/calendars/'+calendarid+'/acl',
				    data: param,
				    success: function(result){
				    	console.info("ACL", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
		},
		
		
		insertACL: function(){
			googleToken.getToken().then(function(token){

				var calendarid = prompt("Calendarid: ", "");
				/**/
				var param = {
					scope: { 
						type: 'user',
						value: 'huylam06@gmail.com'
					},
					role: 'writer',
					kind: "calender#aclRule"
				}
				$.ajax({
				    type: 'POST',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/calendars/'+calendarid+'/acl',
				    contentType: "application/json; charset=UTF-8",
				    data: JSON.stringify(param),
				    beforeSend: function (xhr) {
		              /////   Authorization header////////
		                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
		            },
				    success: function(result){
				    	console.info("ACL", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
		},
		
		listEvents: function(){
			googleToken.getToken().then(function(token){
			
				var calendarid = prompt("Calendarid: ", "");
				/**/
				var param = {
						access_token: token.access_token
				}
				$.ajax({
				    type: 'GET',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/calendars/'+calendarid+'/events',
				    data: param,
				    success: function(result){
				    	console.info("List Event", result);
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    }
				});
			});
		},
		
		
		createEvent: function(data){
			console.info("APPT DATA: ", data);
			var deferred = $q.defer();
			var calendarid;
			//TODO determine appt time based on service type
			//TODO: determine calendar based on tech request
			if(data.tech == "Kathy"){
				calendarid = kathyCal;
			}else if(data.tech == "Ann"){
				calendarid = annCal;
			}else if(data.tech == "Tina"){
				calendarid = tinaCal;
			}else if(data.tech == "Mimi"){
				calendarid = mimiCal;
			}else if(data.tech == "Lisa"){
				calendarid = lisaCal
			}else if(data.tech == "Lee"){
				calendarid = leeCal;
			}else if(data.tech == "Steven"){
				calendarid = stevenCal;
			}else{
				calendarid = storeCal;
			}
				
			var start = Date.parse(data.date + " " + data.time);
			//TODO: determine service duration
			
			var hour = 60*60*1000;
			var half = hour/2;
			var hourhalf = hour + half;
			var twohour = hour *2;
			
			var end = start + 60*60*1000;
			if(data.service == "manicure"){
				end = start + half;
			}else if(data.service = "pedicure"){
				end = start + hour;
			}else{
				end = start + hour;
			}
			
			
			var startTime = new Date(start);
			var endTime = new Date(end);
			
			//checking for free/busy time slot if requesting a specific technician
			if(calendarid != storeCal){
				console.info("FIRRST THIS: ", this);
				this.freeBusy(calendarid, startTime, endTime).then(function(success){
					//proceed to booking
					console.info("INNER THIS: ", this);
					console.info("result this: ", success);
					createBooking(deferred, calendarid, startTime, endTime, data);
					
				}, function(error){
					//return booking error
					deferred.reject(error);
				});
				
			}else{
				createBooking(deferred, calendarid, startTime, endTime, data);
			}
			
			
			
			return deferred.promise;
		},
		
		
		freeBusy: function(cal, startTime, endTime){
			var deferred = $q.defer();
			
			googleToken.getToken().then(function(token){
				//cal = prompt("Calendarid: ", cal);
							
				var param = {
						  "timeMin": startTime,
						  "timeMax": endTime,
						  "items": [
						    {
						      "id": cal
						    }
						  ]
						};
				$.ajax({
				    type: 'POST',
				    // make sure you respect the same origin policy with this url:
				    // http://en.wikipedia.org/wiki/Same_origin_policy
				    url: 'https://www.googleapis.com/calendar/v3/freeBusy',
				    contentType: "application/json; charset=UTF-8",
				    data: JSON.stringify(param),
				    beforeSend: function (xhr) {
		              /////   Authorization header////////
		                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
		            },
				    success: function(result){
				    	console.info("FreeBusy", result.calendars[cal].busy);
			    		//check start and end time against booking time, Defer error if slot not open
				    	if(result.calendars[cal].busy.length > 0){
				    		deferred.reject(result.calendars[cal].busy);
				    	}else{
				    		deferred.resolve(this);
				    	}
				    	//not neccessary logic, just saving here
			    		/*for(var i = 0; i < result.calendars[cal].busy.length; i++){
			    			var busyStart = new Date(result.calendars[cal].busy[0].start);
			    			var busyEnd = new Date(result.calendars[cal].busy[0].end);
			    			if(busyStart <= endTime && busyEnd >= startTime){
			    				deferred.reject(result);
			    			}
			    		}*/
			    	
				    	
				    	
				    },
				    error: function(error){
				    	console.info("ERROR: ", error);
				    	deferred.reject(error);
				    }
				});
			});
			
			return deferred.promise;
		},
		
	};

	
	function createBooking(deferred, calendarid, startTime, endTime, data){		
		//calendarid = prompt("Calendarid: ", calendarid);
		
		var param = {
			'summary': data.service + " for " + data.firstName,
			  'location': '830 S King St, Leesburg, VA 20175',
			  'description': data.service,
			  'start': {
			    'dateTime': startTime,
			    'timeZone': 'GMT'
			  },
			  'end': {
			    'dateTime': endTime,
			    'timeZone': 'GMT'
			  },
			  'attendees': [
			    {
			      'email': data.email,
			      'displayName': data.firstName,
			      'responseStatus': "accepted"
			    }
			   //only customer as attendee. no need to add main calendar, otherwise dup event is created
			  ],
			  'reminders': {
			    'useDefault': false,
			    'overrides': [
			      {'method': 'email', 'minutes': 60},
			      {'method': 'popup', 'minutes': 10}
			    ]
			  }
		}
		
		googleToken.getToken().then(function(token){
			$.ajax({
			    type: 'POST',
			    // make sure you respect the same origin policy with this url:
			    // http://en.wikipedia.org/wiki/Same_origin_policy
			    url: 'https://www.googleapis.com/calendar/v3/calendars/'+calendarid+'/events?sendNotifications=true',
			    contentType: "application/json; charset=UTF-8",
			    data: JSON.stringify(param),
			    beforeSend: function (xhr) {
	              /////   Authorization header////////
	                xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);
	            },
			    success: function(result){
			    	console.info("List Event", result);
			    	deferred.resolve(result);
			    },
			    error: function(error){
			    	console.info("ERROR: ", error);
			    	deferred.reject(error);
			    }
			});
		}, function(error){
			deferred.reject(error);
		});
		
	}
	
}
]);