"use strict";
define(['../../lib/Tool'],function(tool){
    return Backbone.Model.extend({
        url:openbiz.apps.mainapp.appUrl,
        idAttribute: "_id",
        defualts:{
        }
    });
})