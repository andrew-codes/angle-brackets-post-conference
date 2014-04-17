define(['services/zzaDataRepository'], function (dataService) {
    var currentOrder = function () {
        return dataService.getCurrentOrder();
    }

    return {
        currentOrder: currentOrder
    };
});