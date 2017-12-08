/**
 * Created by ccMoving on 15/11/24.
 */

"use strict";
define(function(){
    return openbiz.MiddleWareRouter.extend({
        isRendered:false,
        app: "mainapp",
        middlewares:{
            "*any"   			: "renderLayout",
            "!/backend/*ensureLogin": "ensureLogin",
        },
        initialize:function(){
            openbiz.MiddleWareRouter.prototype.initialize.call(this);
        },
        ensureLogin:function(next){
            var admin = store.get('admin');
            openbiz.admin = admin;
            if(openbiz.admin == null || _.isUndefined(openbiz.admin))
            {
                Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
            }
            else{
                var headerView = this.app.viewService.get("system.HeaderView");
                headerView.setUsername("管理员")
                next();
            }
        },

        renderLayout:function(next){
            if(this.isRendered == true){
                next();
                return;
            }
            var self = this;
            async.mapSeries(["system.HeaderView","system.MenuView"],function(data,cb){
                var view = self.app.viewService.get(data);
                if(view == null){
                    self.renderView(data,function(){
                        cb(null,null);
                    });
                }else{
                    cb(null,null);
                }
            },function(err,result){
                self.isRendered = true;
                next();
            });
        }
    });
});