define(["text!templates/login/loginView.html","../../backend/models/Admin"],function(e,t){return openbiz.View.extend({app:"mainapp",el:"#login",model:t,events:{"click button.login":"login"},initialize:function(){return openbiz.View.prototype.initialize.call(this),this.model=new t,this},login:function(e){if(e.preventDefault(),$("#lgform").parsley().validate()){var t=$(".login").button("loading");this.model.login($(".username").val(),$(".password").val(),function(e,i){t.button("reset"),e?(i.id=i.userid,store.set("admin",i),openbiz.admin=i,Backbone.history.navigate("#!/backend/apply",{trigger:!0,replace:!0})):alert("用户名/密码错误!")})}},render:function(){return this.template=_.template(e),this.$el.html(this.template()),this}})});