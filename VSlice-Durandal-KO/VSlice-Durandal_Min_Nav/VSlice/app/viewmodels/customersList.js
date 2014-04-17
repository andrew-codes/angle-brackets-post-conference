define(function() {
    var customers = ko.observableArray([]);
    var vm = {
        customers: customers,
        activate: activate
    };
    return vm;

    function activate() {
        $.getJSON("api/Customers").done(function (data) {
            vm.customers(data);
        });
    };
});