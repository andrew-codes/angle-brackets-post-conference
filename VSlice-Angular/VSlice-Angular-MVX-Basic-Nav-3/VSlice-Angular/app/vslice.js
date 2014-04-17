(function () {
    'use strict';

    var id = 'vslice';

    // TODO: Inject modules as needed.
    var vslice = angular.module('vslice', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute'           // routing

        // Custom modules 

        // 3rd Party Modules
        
    ]);

    // Execute bootstrapping code and any dependencies.
    vslice.run(['$route',
        function ($route) {
            // Include $route to kick start the router.
        }]);

    vslice.config(['$routeProvider', routeConfigurator]);
    function routeConfigurator($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'app/customers/customers.html' });
        $routeProvider.when('/orders', { templateUrl: 'app/orders/customerOrder.html' });
        $routeProvider.otherwise({ redirectTo: '/' });
    };
})();