
ko.bindingHandlers.imagePath = {
    init: function (element, valueAccessor) {
        element.src = '/images/' + valueAccessor();
    }
};
