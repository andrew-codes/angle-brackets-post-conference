define(function() {
    var customers = ko.observableArray([]);
    var vm = {
        customers: customers,
        activate: activate
    };
    return vm;

    function activate() {
        if (customers().length == 0) {
            $.getJSON("api/Customers").done(function (data) {
                vm.customers(data);
            });
        }
    };
});