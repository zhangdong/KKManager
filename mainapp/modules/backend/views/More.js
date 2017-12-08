/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/backend/more.html'],
    function(templateData){
        return openbiz.View.extend({
            app:"mainapp",
            el:"",
            newModel:true,
            data:"",
            events:{
                "click .btn-dddd" 	: "done"
            },
            done:function(e)
            {
                e.preventDefault();
                this.$el.modal('hide');

            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                var data = $("body").data('newRecordData');
                this.data = data;
                return this;
            },
            render:function()
            {
                this.template = _.template(templateData);
                this.$el.html(this.template({title:this.data}));
                return this;
            }
        });
    }
);