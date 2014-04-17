/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../knockout-2.3.0.js"/>
/// <reference path="../moment.js" />
/// <reference path="../breeze.debug.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="logger.js" />
/// 

var app = app || {};

app.orderViewModel = (function (zzaDataService, logger) {
    var products = ko.observableArray([]),
        customer = ko.observable(''),
        order = ko.observable(''),
        orderItems = ko.observableArray([]),
        homeViewModel = ko.observable(''),
        load = function () {
            zzaDataService.getProducts().then(productsLoaded).fail(errorLoading);
        },
        productsLoaded = function (data) {
            products(data.results);
        },
        errorLoading = function (error) {
            logger.error(error.message, "Loading product data failed");
        },
        addToOrder = function (product) {
            if (!order())
                order(zzaDataService.createNewOrder(customer()));
            var orderItem = order().entityAspect.entityManager.createEntity("OrderItem");
            orderItem.order(order());
            orderItem.product(product);
            orderItem.productSizeId(1);
            orderItems.push(orderItem);
            
        },
        placeOrder = function () {
            zzaDataService.saveOrder(order()).then(function () {
                order('');
                orderItems([]);
                homeViewModel().showCustomerList();
            })
            .fail(function (error) {
                logger.error(error.message, "Error saving order");
            });
        },
        cancelOrder = function () {
            order().entityAspect.rejectChanges();
            order('');
            orderItems([]);
            homeViewModel().showCustomerList();
        }
        ;
    return {
        products: products,
        load: load,
        placeOrder: placeOrder,
        cancelOrder: cancelOrder,
        customer: customer,
        addToOrder: addToOrder,
        order: order,
        orderItems: orderItems,
        homeViewModel: homeViewModel
    };

}(app.zzaDataService, app.logger));