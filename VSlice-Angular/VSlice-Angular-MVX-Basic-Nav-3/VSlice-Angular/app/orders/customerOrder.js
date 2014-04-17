(function () {
    'use strict';

    var controllerId = 'customerOrder';

    angular.module('vslice').controller(controllerId,
        [customerOrder]);

    function customerOrder() {
        var vm = this;

        vm.title = 'customerOrder';

        activate();
        function activate() { }
    }
})();
