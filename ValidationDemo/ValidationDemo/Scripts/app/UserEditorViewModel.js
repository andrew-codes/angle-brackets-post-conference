/// <reference path="../q.js" />
/// <reference path="../knockout-2.3.0.js" />
/// <reference path="../breeze.debug.js" />
/// <reference path="../toastr.js" />
/// <reference path="../moment.js" />
/// <reference path="../jquery-2.0.3.js" />

var app = app || {};

app.em = new breeze.EntityManager("breeze/ValDemo");

app.userEditorViewModel = (function (logger) {
    var users = ko.observableArray([]),
        editingUser = ko.observable(''),
        showEdit = ko.observable(false),
        load = function () {
            var query = breeze.EntityQuery.from("Users");
            app.em.executeQuery(query).then(function (data) {
                users(data.results);
            }).fail(loadError);
        },
        editSubscriptionToken = null,
        edit = function (user) {
            editingUser(user);
            editSubscriptionToken = editingUser().entityAspect.validationErrorsChanged.subscribe(function (args) {
                var message = '';
                if (args.added) {
                    for (var i = 0; i < args.added.length; i++) {
                        if (i > 0) message += ", ";
                        message = message + args.added[i].errorMessage;
                    }
                }
                if (message) logger.error(message, "Validation Errors");
            });
            showEdit(true);
        },
        saveEdit = function () {
            if (validateUser(editingUser())) {
                app.em.saveChanges().fail(saveError);
                editingUser().entityAspect.validationErrorsChanged.unsubscribe(editSubscriptionToken);
                editingUser('');
                showEdit(false);

            }
        },
        validateUser = function (user) {
            if (!user.entityAspect.validateEntity()) {
                var errors = user.entityAspect.getValidationErrors();
                showValidationErrors(errors);
                return false;
            }
            else return true;

        },
        showValidationErrors = function (errors) {
            var errorMessage = "";
            errors.map(function (e) {
                if (errorMessage.length > 0) errorMessage += ", ";
                errorMessage += e.errorMessage;
            });
            logger.error(errorMessage, "Validation Errors");
        },
        cancelEdit = function () {
            editingUser().entityAspect.rejectChanges();
            editingUser().entityAspect.validationErrorsChanged.unsubscribe(editSubscriptionToken);
            editingUser('');
            showEdit(false);
        },
        loadError = function (error) {
            logger.error(error.message, "Error loading data");
        },
        saveError = function (error) {
            if (error.entityErrors) {
                showValidationErrors(error.entityErrors);
            }
            else {
                logger.error(error.message, "Error saving data");
            }
        };
    return {
        users: users,
        editingUser: editingUser,
        showEdit: showEdit,
        load: load,
        edit: edit,
        saveEdit: saveEdit,
        cancelEdit: cancelEdit
    };
}(app.logger));

function isValidScoreRange(value, context) {
    return value > 1 && value <= 100.00;
};

function isValidRange(value, context) {
    return value > context.minValue && value <= context.maxValue;
};

function rangeValidatorFactory(context) {
    return new breeze.Validator(
        "rangeValidator",
        isValidRange,
        {
            minValue: context.minValue,
            maxValue: context.maxValue,
            messageTemplate: '%displayname% value %value% must be between %minValue% and %maxValue%'
        }
        );
}

function initValidation(em) {
    // Add phone validation rule 
    var store = em.metadataStore;
    var userType = store.getEntityType("User");
    var phoneProp = userType.getProperty("phone");
    phoneProp.validators.push(breeze.Validator.phone());
    // Add email, credit card, and URL validators
    userType.getProperty("email").validators.push(breeze.Validator.emailAddress());
    userType.getProperty("creditCard").validators.push(breeze.Validator.creditCard());
    userType.getProperty("webSite").validators.push(breeze.Validator.url());

    //var userKeyValidator = breeze.Validator.makeRegExpValidator(
    //    "userKeyVal", 
    //    /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/, 
    //    "%displayName% '%value%' is not a valid GUID");
 
    //userType.getProperty("userKey").validators.push(userKeyValidator);

    var scoreRangeValidator = new breeze.Validator(
        "scoreRangeValidator",
        isValidScoreRange,
        { messageTemplate: '%displayName% %value% must be between 0 and 100' }
        );
    //userType.getProperty("score").validators.push(scoreRangeValidator);
    userType.getProperty("score").validators.push(rangeValidatorFactory({ minValue: 1, maxValue: 100 }));

    breeze.Validator.register(userKeyValidator);
    breeze.Validator.registerFactory(rangeValidatorFactory, "rangeValidator");

};
app.em.fetchMetadata().then(function () { initValidation(app.em); });
//app.em.validationErrorsChanged.subscribe(function (args) {
//    var message = '';
//    if (args.added) {
//        for (var i = 0; i < args.added.length; i++) {
//            if (i > 0) message += ", ";
//            message = message + args.added[i].errorMessage;
//        }
//    }
//    if (message) app.logger.error(message, "Validation Errors");

//});
app.userEditorViewModel.load();
ko.applyBindings(app.userEditorViewModel);