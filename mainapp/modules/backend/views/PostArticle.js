
/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/backend/postArticle.html','text!templates/backend/postAction.html'],
    function(templateData,actionTemplate){
        return openbiz.View.extend({
            app:"mainapp",
            el:".main",
            index:0,
            events:{
                'click .btn-record-addnew':'addnew',
                'click .btn-record-submit':'submit'
            },
            initialize:function(){
                return this;
            },
            render:function()
            {
                this.template = _.template(templateData);
                this.$el.html(this.template());

                var _actionTemplate = _.template(actionTemplate);

                var html = _actionTemplate({index:this.index});

                $("#postform").append(html);
                $(".paragraph-close").hide();
                this.setupListen();
                return this;
            },
            addnew:function(){
                this.index++;
                var _actionTemplate = _.template(actionTemplate);
                var html = _actionTemplate({index:this.index});
                $("#postform").append(html);
                this.setupListen();
            },
            submit:function(e){
                e.preventDefault();
                var result = $('#postform').parsley().validate();
                console.log(result);
                console.log($('#postform'));
                $('#postform').children()
            },
            setupListen :function (){

                $(".img2").hide();
                var self = this;
                $(".filepath").off("change");
                $(".filepath").on("change",function(e) {
                    e.preventDefault();
                    var srcs = self.getObjectURL(this.files[0]);   //获取路径
                    $(this).nextAll(".img1").hide();   //this指的是input
                    $(this).nextAll(".img2").show();  //fireBUg查看第二次换图片不起做用
                    $(this).nextAll('.image-close').show();   //this指的是input
                    $(this).nextAll(".img2").attr("src",srcs);    //this指的是input
                    $(this).val('');    //必须制空
                })
                $(".image-close").off("click");
                $(".image-close").on("click",function(e) {
                    e.preventDefault();
                    $(this).hide();     //this指的是span
                    $(this).nextAll(".img2").hide();
                    $(this).nextAll(".img1").show();
                });
                $(".paragraph-close").off("click");
                $(".paragraph-close").on("click",function(e){
                    e.preventDefault();
                    var recordId = $(e.currentTarget).attr('record-index');
                    console.log(recordId);
                    if(recordId > 0) {
                        var sel = ".paragraphContent[record-index="+recordId+"]";
                        $(sel).remove();
                    }
                });
            },
            getObjectURL:function(file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url;
            }
        });
    }
);