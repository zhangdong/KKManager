/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/system/centerMenuView.html',"../../lib/Tool"],
    function(centerTemplateData,tool){
        return openbiz.View.extend({
            app:"mainapp",
            module:"system",
            name:"menuView",
            el:"#sidebar-collapse",
            assetsPath:"./assets/sounds/alert.mp3",
            page:0,
            events:{

            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                return this;
            },
            render:function()
            {
                $(this.el).html(centerTemplateData);
                return this;
            },
            project:function(e){
                e.preventDefault();
            },
            setupNav:function(i) {
                var sel = ".nav.menu";
                $(sel).children().removeClass("active");
                $(sel + " li:eq("+i+")").addClass("active");
            }
        });
    }
);