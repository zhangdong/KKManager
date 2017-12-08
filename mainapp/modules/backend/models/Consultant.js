"use strict";
define(['../../lib/Tool'],function(tool){
    return Backbone.Model.extend({
        url:openbiz.apps.mainapp.appUrl,
        idAttribute: "_id",
        defualts:{
        },
        lh:function(callback){
            var params = {"topic":"review/agree","payload":{_id:this.id},"time":new Date().getTime()/1000};
            tool.http(this.url,"POST",JSON.stringify(params),function(success,data){
                callback(success,data);

            });
        }
    });
})