define(['services/zzaDataRepository'], function (dataRepository) {
    var products = ko.observableArray([]),
        activate = function () {
            dataRepository.getAllProducts().then(updateProducts).fail(handleLoadError);
            function updateProducts(data) {
                products(data.results);
            }
            function handleLoadError(error) {
                alert(error.message);
            }

        },
        addToOrder = function (product) {
            var order =dataRepository.getCurrentOrder();
            var orderItem = product.entityAspect.entityManager.createEntity("OrderItem");
            orderItem.Order(order);
            orderItem.Product(product);
            orderItem.ProductSizeId(1);
        };

    return {
        products: products,
        activate: activate,
        addToOrder: addToOrder
    };
});