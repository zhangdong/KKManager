"use strict";

define([ "./Object" ], function(object) {
    return object.extend({
        models: {},
        views: {},
        router: null,
        init: function() {
            if (this.router != null) {
                new this.router();
            }
        }
    });
});