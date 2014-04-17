﻿define(['plugins/router','knockout'], function (router, knockout) {
    var currentView = ko.observable('viewmodels/customersList');

    var vm = {
        placeOrder: placeOrder,
        orderComplete: orderComplete,
        activate: activate
    };
    return vm;

    function activate() {
        router.map([
            { route: '', title: 'Zza Pizza', moduleId: 'viewmodels/customersList' },
            { route: 'customersList', moduleId: 'viewmodels/customersList', nav: true },
            { route: 'placeOrder/:customerId', moduleId: 'viewmodels/placeOrder', nav: true }
        ]).buildNavigationModel();

        return router.activate();
    };

    function placeOrder(customer) {
        router.navigate('placeOrder/' + customer.id);
    };

    function orderComplete() {
        router.navigate('customersList');
    };
});
