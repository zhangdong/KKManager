define(["text!templates/backend/postArticle.html","text!templates/backend/postAction.html"],function(e,t){return openbiz.View.extend({app:"mainapp",el:".main",index:0,events:{"click .btn-record-addnew":"addnew","click .btn-record-submit":"submit"},initialize:function(){return this},render:function(){this.template=_.template(e),this.$el.html(this.template());var i=_.template(t),n=i({index:this.index});return $("#postform").append(n),$(".paragraph-close").hide(),this.setupListen(),this},addnew:function(){this.index++;var e=_.template(t),i=e({index:this.index});$("#postform").append(i),this.setupListen()},submit:function(e){e.preventDefault();var t=$("#postform").parsley().validate();console.log(t),console.log($("#postform")),$("#postform").children()},setupListen:function(){$(".img2").hide();var e=this;$(".filepath").off("change"),$(".filepath").on("change",function(t){t.preventDefault();var i=e.getObjectURL(this.files[0]);$(this).nextAll(".img1").hide(),$(this).nextAll(".img2").show(),$(this).nextAll(".image-close").show(),$(this).nextAll(".img2").attr("src",i),$(this).val("")}),$(".image-close").off("click"),$(".image-close").on("click",function(e){e.preventDefault(),$(this).hide(),$(this).nextAll(".img2").hide(),$(this).nextAll(".img1").show()}),$(".paragraph-close").off("click"),$(".paragraph-close").on("click",function(e){e.preventDefault();var t=$(e.currentTarget).attr("record-index");if(console.log(t),t>0){var i=".paragraphContent[record-index="+t+"]";$(i).remove()}})},getObjectURL:function(e){var t=null;return void 0!=window.createObjectURL?t=window.createObjectURL(e):void 0!=window.URL?t=window.URL.createObjectURL(e):void 0!=window.webkitURL&&(t=window.webkitURL.createObjectURL(e)),t}})});