"use strict";
define(['text!templates/common/notFoundView.html'],
    function(templateData){
        return openbiz.View.extend({
            app: 'mainapp',
            module:'common',
            name: 'notFoundView',
            el:'.main',
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                return this;
            },
            render:function(){
                this.template = _.template(templateData);
                this.$el.html(this.template());
                return this;
            },
        });
    }
);