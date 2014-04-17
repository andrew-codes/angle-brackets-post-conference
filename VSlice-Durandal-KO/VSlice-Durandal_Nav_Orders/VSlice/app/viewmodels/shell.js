/// <reference path="../../Scripts/toastr.js" />
define(['durandal/app','durandal/events','plugins/router','knockout'], function (app, events, router, knockout) {
    var currentView = ko.observable('viewmodels/customersList');

    var vm = {
        placeOrder: placeOrder,
        orderComplete: orderComplete,
        activate: activate
    };
    return vm;

    function activate() {
        events.includeIn(app);
        app.on("zza:orderItemAdded").then(function (orderItem) {
            toastr.info(orderItem.Name, "Order Item Added");
        });
        router.map([
            { route: '', title: 'Zza Pizza', moduleId: 'viewmodels/customersList' },
            { route: 'customersList', moduleId: 'viewmodels/customersList', nav: true },
            { route: 'placeOrder/:customerId', moduleId: 'viewmodels/placeOrder', nav: true }
        ]).buildNavigationModel();

        return router.activate();
    };

    function placeOrder(customer) {
        router.navigate('placeOrder/' + customer.Id);
    };

    function orderComplete() {
        router.navigate('customersList');
    };
});
