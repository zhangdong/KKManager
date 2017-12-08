"use strict";
define(['../../lib/Tool'],function(tool){
    return Backbone.Model.extend({
        url:openbiz.apps.mainapp.appUrl,
        idAttribute: "_id",
        defualts:{
        },
        bh:function(callback){
            var params = {"topic":"review/agree","payload":{_id:this.id},"time":new Date().getTime()/1000};
            tool.http(this.url,"POST",JSON.stringify(params),function(success,data){
                callback(success,data);

            });
        },tg:function(callback){
            var params = {"topic":"review/deny","payload":{_id:this.id},"time":new Date().getTime()/1000};
            tool.http(this.url,"POST",JSON.stringify(params),function(success,data){
                callback(success,data);
            });
        }
    });
})