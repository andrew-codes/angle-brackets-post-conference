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
    // TODO: inject services as needed.
    vslice.run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);
})();