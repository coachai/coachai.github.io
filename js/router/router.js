foodTrackingApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tmpl/home.html',
            controller: 'foodTrackingController'
        }).when('/food/:foodName', {
            templateUrl: 'tmpl/bookTickets.html',
            controller: 'FoodDetailCtrl'
         }).when('/newMeat', {
            templateUrl: 'tmpl/country-list.html',
            controller: 'meatController'
         }).when('/:countryName', {
             templateUrl: 'tmpl/country-detail.html',
            controller: 'CountryDetailCtrl' 
         
			}).otherwise({ redirectTo: ''
        });
});
