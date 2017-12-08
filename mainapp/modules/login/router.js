"use strict";
define(function(){
    return openbiz.Router.extend({
        app: 'mainapp',
        routes:{
            "!/user/login"		: "login"
        },
        initialize:function(){
            openbiz.Router.prototype.initialize.call(this);
        },
        login:function(){
            this.renderView("login.LoginView");
            $(".login-main").show();
            $("#mainapp").hide();
        }
    });
});