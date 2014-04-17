/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/knockout-2.3.0.debug.js" />

define(['durandal/app','durandal/events','plugins/router'], function (app, events, router) {
    var orders = [];
    var products = ko.observableArray([]);
    var orderItems = ko.observableArray([]);
    var currentCustomerId = '';
    var vm = {
        products: products,
        activate: activate,
        addToOrder: addToOrder,
        orderItems: orderItems,
        submitOrder: submitOrder,
        currentCustomerId: currentCustomerId
    };
    return vm;

    function activate(customerId) {
        vm.currentCustomerId = customerId;
        if (products().length == 0) {
            $.getJSON('api/Products').done(function (data) {
                vm.products(data);
            });
        }
        if (orders[customerId]) {
            orderItems(orders[customerId].orderItems);
        }
        else {
            orderItems([]);
        }
    };

    function addToOrder(product) {
        var orderItem = {
            Name: product.Name,
            ProductId: product.Id,
            ProductSizeId: 1,
            Quantity: 1,
            UnitPrice: 1.0,
            TotalPrice: 1.0
        }
        orderItems.push(orderItem);
        app.trigger('zza:orderItemAdded', orderItem);
        orders[vm.currentCustomerId] = { orderItems: orderItems() };
    };

    function submitOrder() {
        if (vm.orderItems().length > 0) {

            var order = {
                CustomerId: vm.currentCustomerId,
                OrderDate: '1/1/2014',
                OrderStatusId: 1,
                ItemsTotal: 10.0
            };
            $.ajax({
                url: "api/Orders",
                type: "POST",
                data: JSON.stringify(order),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function (order) {
                var allSuccess = true;
                ko.utils.arrayForEach(vm.orderItems(), function (orderItem) {
                    orderItem.OrderId = order.Id;
                    $.ajax({
                        url: "api/OrderItems",
                        type: "POST",
                        data: JSON.stringify(orderItem),
                        dataType: 'json',
                        contentType: 'application/json'
                    })
                    .fail(function (jqXhr, status, error) { allSuccess = false; alert(error); });
                });
                if (allSuccess) {
                    router.navigate('customersList');
                }
            })
            .fail(function (jqXhr, status, error) {
                alert(error);
            });
        }

    };
});