/// <reference path="../../Scripts/require.js" />
define(['plugins/router', 'durandal/app', 'knockout', 'services/zzaDataRepository'], function (router, app, ko, dataRepository) {
            var menuSelected = function (context, event) {
                $(event.currentTarget).children('li').removeClass('active');
                $(event.target).parent().addClass('active');
                return true;
            },
            placeOrder = function () {
                dataRepository.getCurrentOrder().OrderDate(new Date());
                dataRepository.saveChanges().fail(function (error) { alert(error.message); });
            },
            activate = function () {
            router.map([
                { route: '', title: 'Products', moduleId: 'viewmodels/productsList', nav: true },
                { route: 'productsList', moduleId: 'viewmodels/productsList', nav: true },
                { route: 'currentOrderInfo', moduleId: 'viewmodels/currentOrderInfo', nav: true },
                { route: 'orderHistory', moduleId: 'viewmodels/orderHistory', nav: true}
            ]).buildNavigationModel();


            //this.load();
            return router.activate();
        };

    return {
        menuSelected: menuSelected,
        placeOrder: placeOrder,
        activate: activate
    };
});