"use strict";
define(function(){
    return openbiz.Router.extend({
        app: 'mainapp',
        routes:{
            "":"checkLogin",
            "!/backend/:action"		: "action",
        },
        checkLogin:function(){
            var admin = store.get('admin');
            openbiz.admin = admin;
            if(openbiz.admin == null || _.isUndefined(openbiz.admin) || admin.permission != 1)
            {
                Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
            }
            else{
                Backbone.history.navigate("#!/backend/admin", {trigger: true, replace: true});
            }
        },
        initialize:function(){
            openbiz.Router.prototype.initialize.call(this);
        },
        action:function(action){
            $(".login-main").hide();
            $("#mainapp").show();
            var menuView = this.app.viewService.get("system.MenuView");
            switch(action)
            {
                case "apply":
                    this.renderView("backend.ApplyList");
                    menuView.setupNav(0);
                    break;
                case "consultant":
                    this.renderView("backend.ConsultantList");
                    menuView.setupNav(1);
                    break;
                case "user":
                    this.renderView("backend.UserList");
                    menuView.setupNav(2);
                    break;
                case "add":
                    this.renderView("backend.PostArticle");
                    menuView.setupNav(3);
                    break;
                default:
                    $(".login-main").show();
                    $("#mainapp").hide();
                    Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
                    break;
            }
        }
    });
});