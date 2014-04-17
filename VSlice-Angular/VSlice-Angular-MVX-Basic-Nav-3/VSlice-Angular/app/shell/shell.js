(function () {
    'use strict';

    var controllerId = 'shell';

    // TODO: replace app with your module name
    angular.module('vslice').controller(controllerId,
        [shell]);

    function shell() {
        var vm = this;

        vm.title = 'shell';
        activate();
        function activate() {
        }
    }
})();
