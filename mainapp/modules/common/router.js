"use strict";
define(function(){
    return openbiz.Router.extend({
        app: 'mainapp',
        routes:{
            "*notFound"		: "notFound"
        },
        initialize:function(){
            openbiz.Router.prototype.initialize.call(this);
        },
        notFound:function(){
            this.renderView("common.NotFoundView");
        }
    });
});