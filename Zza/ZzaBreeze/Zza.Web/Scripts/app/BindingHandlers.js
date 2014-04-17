/// <reference path="../knockout-2.2.1.js" />
ko.bindingHandlers.imagePath = {
    init: function (element, valueAccessor) {
        element.src = '/images/' + valueAccessor();
    }
};
