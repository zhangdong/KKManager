"use strict";
define(['./User','../../lib/Tool'],function(model,tool){
    return PageableCollection.extend({
        model:model,
        url: openbiz.apps.mainapp.appUrl,
        state: {
            pageSize: 10,
            firstPage: 0
        },
        parseState: function (resp, queryParams, state, options) {
            return {totalRecords: resp.totalRecords};
        },
        fetch: function(options) {
            var collection = this;
            var page = 1;
            if(!_.isNaN(parseInt(options.to))) {
                page = parseInt(options.to) + 1;
            }
            var params = {"topic":"user/list","payload":{page:parseInt(page),count:10},"time":new Date().getTime()/1000};
            tool.http(this.url,"POST",JSON.stringify(params),function(success,data){
                if(success){
                    collection.parse({totalRecords:data.total},{});
                    collection.reset(data.data)
                }
            });
        }
    });
});