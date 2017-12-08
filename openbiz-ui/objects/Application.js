"use strict";

define([ "./Object", "../services/ViewService" ], function(object, ViewService) {
    return object.extend({
        appUrl: null,
        name: null,
        modules: {},
        viewService: ViewService
    });
});