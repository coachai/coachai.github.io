window.foodTrackingApp = angular.module('foodTrackingApp', ['ngRoute']);

foodTrackingApp.controller("foodTrackingController", ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/foods.json').success(function(data) {
      $scope.foods = data;
   
   $scope.currFood = null;
    $scope.getFoodById = function (id) {
        var foods = $scope.foods;
        for (var i = 0; i < foods.length; i++) {
            var food = $scope.foods[i];
            if (food.id == id) {
                $scope.currFood = food;
            }
        }
    };
	 });
	 
	  $scope.headerSrc = "tmpl/header.html";
    // A simple back function, that will help us navigate between views
    $scope.back = function () {
        window.history.back();
    };
	
	 $scope.isActive = function (route) {
        return route === $location.path();
    }
 
    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    }


}]);
foodTrackingApp.controller("meatController", ['$scope', '$http',
  function ($scope, $http) {
    $http.get('data/meat.json').success(function(data) {
      $scope.meats = data;
	 
	   $scope.currMeat = null;
    $scope.getMeatById = function (id) {
        var meats = $scope.meats;
        for (var i = 0; i < meats.length; i++) {
            var meat = $scope.meats[i];
            if (meat.id == id) {
                $scope.currMeat = meat;
            }
        }
    };
    });
    $scope.headerSrc = "tmpl/header.html";
  
   
    // A simple back function, that will help us navigate between views
    $scope.back = function () {
        window.history.back();
    };
	
	 $scope.isActive = function (route) {
        return route === $location.path();
    }
 
    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    }


}]);
foodTrackingApp.controller("movieDetailsController", function ($scope, $routeParams) {
    $scope.getMeatById($routeParams.id);
});

 
foodTrackingApp.controller('CountryDetailCtrl', function ($scope, $routeParams, $http){
        $scope.name = $routeParams.countryName;

        $http.get('data/meat.json').success(function(data) {
          $scope.meat = data.filter(function(entry){
            return entry.name === $scope.name;
          })[0];
        });
      });

foodTrackingApp.controller('FoodDetailCtrl', function ($scope, $routeParams, $http){
        $scope.name = $routeParams.foodName;

        $http.get('data/foods.json').success(function(data) {
          $scope.food = data.filter(function(entry){
            return entry.name === $scope.name;
          })[0];
        });
      });
	  
foodTrackingApp.service('ContactService', function () {
    //to create unique contact id
    var uid = 1;
    
    //contacts array to hold list of all contacts
    var contacts = [{
        id: 0,
        'name': 'Viral',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
    }];
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

	  //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }


    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }
});

foodTrackingApp.controller('ContactController', function ($scope, ContactService) {

    $scope.contacts = ContactService.list();

    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
    }


    $scope.delete = function (id) {

        ContactService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }


    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    }
})

foodTrackingApp.controller("bookTicketsController", function ($scope, $http, $location, $routeParams) {
    $scope.getFoodById($routeParams.id);
    $scope.onlyNumbers = /^\d+$/;
    $scope.formData = {};
    $scope.formData.movie_id = $scope.currFood.id;
    $scope.formData.movie_name = $scope.currFood.name;
    $scope.formData.date = "Today"
 
   
});
foodTrackingApp.controller("bookingDetailsController", function ($scope, movieStubBookingsFactory) {
   // $scope.bookings = movieStubBookingsFactory.query();
	$scope.bookings = ContactService.list();
});


foodTrackingApp.controller('MainCtrl', function($scope) {
  $scope.var1 = '12-07-2013';
});


foodTrackingApp.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          element.datetimepicker({
            dateFormat:'dd-MM-yyyy',
           language: 'en',
           pickTime: false,
           startDate: '01-11-2013',      // set a minimum date
           endDate: '01-11-2030'          // set a maximum date
          }).on('changeDate', function(e) {
            ngModelCtrl.$setViewValue(e.date);
            scope.$apply();
          });
        }
    };
});
