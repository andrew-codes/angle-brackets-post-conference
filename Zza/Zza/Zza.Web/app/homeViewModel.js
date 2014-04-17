

app.homeViewModel = function (dataRepository) {
    var products = ko.observableArray([]),
        currentTemplate = ko.observable('ProductsList'),
        currentOrder = ko.observable(''),
        load = function () {
            dataRepository.getAllProducts().then(updateProducts).fail(handleLoadError);
            function updateProducts(data) {
                products(data.results);
            }
            function handleLoadError(error) {
                alert(error.message);
            }
        },
        menuSelected = function (context, event) {
            $(event.currentTarget).children('li').removeClass('active');
            $(event.target).parent().addClass('active');
            var navLink = event.target.id;
            // TODO: Use convention
            if (navLink === "productsList") currentTemplate("ProductsList");
            if (navLink === "currentOrder") currentTemplate("CurrentOrder");
            if (navLink === "orderHistory") currentTemplate("OrderHistory");
        },
        addToOrder = function (product) {
            var order = currentOrder();
            if (!order) currentOrder(dataRepository.getCurrentOrder());
            var orderItem = product.entityAspect.entityManager.createEntity("OrderItem");
            orderItem.Order(dataRepository.getCurrentOrder());
            orderItem.Product(product);
            orderItem.ProductSizeId(1);
        },
        placeOrder = function () {
            dataRepository.getCurrentOrder().OrderDate(new Date());
            dataRepository.saveChanges().fail(function (error) { alert(error.message); });
        };

    return {
        products: products,
        currentTemplate: currentTemplate,
        load: load,
        menuSelected: menuSelected,
        addToOrder: addToOrder,
        currentOrder: currentOrder,
        placeOrder: placeOrder
    };
}(app.zzaDataRepository);

app.homeViewModel.load();
ko.applyBindings(app.homeViewModel);