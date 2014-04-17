(function () {
    'use strict';

    var controllerId = 'customerOrder';

    angular.module('app').controller(controllerId,
        [customerOrder]);

    function customerOrder() {
        var vm = this;

        vm.title = 'customerOrder';

        activate();
        function activate() { }
    }
})();
