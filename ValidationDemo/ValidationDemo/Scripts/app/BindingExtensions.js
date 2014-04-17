/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="../moment.js" />
/// <reference path="../knockout-2.3.0.js" />
ko.bindingHandlers.modal = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value) $(element).modal();
        else $(element).modal('hide');
    }
};
