/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/system/headerView.html'],
    function(templateData){
        return openbiz.View.extend({
            app:"mainapp",
            module:"system",
            name:"headerView",
            el:"#header",
            id:null,
            msgs:{},
            events:{
                "click a.logout":"logout",
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                return this;
            },
            render:function()
            {
                this.template = _.template(templateData);
                this.$el.html(this.template());

                return this;
            },
            setUsername:function(name){
                $("#adminName").html(" 欢迎您:"+name);
                return this;
            },
            logout:function(e)
            {
                e.preventDefault();
                if (confirm("是否登出?")==true)
                {
                    delete openbiz.admin;
                    store.remove('admin');
                    Backbone.history.navigate("#!/user/login", {trigger: true, replace: true});
                }
            }
        });
    }
);