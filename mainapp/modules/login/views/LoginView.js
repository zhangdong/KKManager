/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/login/loginView.html',
        '../../backend/models/Admin',],
    function(templateData,admin){
        return openbiz.View.extend({
            app:"mainapp",
            el:"#login",
            model:admin,
            events:{
                "click button.login":"login"
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.model = new admin();
                return this;
            },
            login:function(e)
            {
                var self = this;
                e.preventDefault();
                var result = $('#lgform').parsley().validate();
                if(result)
                {
                    var $btn = $('.login').button('loading');
                    this.model.login($('.username').val(),$('.password').val(),function(success,data){
                        $btn.button('reset');
                        if(success)
                        {
                            data.id = data.userid;
                            store.set("admin",data);
                            openbiz.admin = data;
                            Backbone.history.navigate("#!/backend/apply", {trigger: true, replace: true});
                        }
                        else {
                            alert("用户名/密码错误!");
                        }
                    });
                }
            },
            render:function()
            {
                this.template = _.template(templateData);

                this.$el.html(this.template());

                return this;
            }
        });
    }
);