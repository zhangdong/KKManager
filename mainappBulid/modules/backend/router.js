define([],function(){return openbiz.Router.extend({app:"mainapp",routes:{"":"checkLogin","!/backend/:action":"action"},checkLogin:function(){var e=store.get("admin");openbiz.admin=e,null==openbiz.admin||_.isUndefined(openbiz.admin)||1!=e.permission?Backbone.history.navigate("#!/user/login",{trigger:!0,replace:!0}):Backbone.history.navigate("#!/backend/admin",{trigger:!0,replace:!0})},initialize:function(){openbiz.Router.prototype.initialize.call(this)},action:function(e){$(".login-main").hide(),$("#mainapp").show();var i=this.app.viewService.get("system.MenuView");switch(e){case"apply":this.renderView("backend.ApplyList"),i.setupNav(0);break;case"consultant":this.renderView("backend.ConsultantList"),i.setupNav(1);break;case"user":this.renderView("backend.UserList"),i.setupNav(2);break;case"add":this.renderView("backend.PostArticle"),i.setupNav(3);break;default:$(".login-main").show(),$("#mainapp").hide(),Backbone.history.navigate("#!/user/login",{trigger:!0,replace:!0})}}})});