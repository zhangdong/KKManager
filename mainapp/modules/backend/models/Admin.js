"use strict";
define(['../../lib/Tool'],function(tool){
    return Backbone.Model.extend({
        url:openbiz.apps.mainapp.appUrl,
        idAttribute: "id",
        defualts:{
        },
        login:function(user,pwd,callback){
            if(user == "admin" && pwd == "123456"){
                callback(true,{username:"zdme","userid":"1fdsfs"});
            }
            else {
                callback(false,{});
            }
            //tool.http(this.url+"LognActoin/lognCheck.htm","POST",{username:user,password:pwd},function(success,data){
            //   callback(success,data);
            //});
        },
    });
})