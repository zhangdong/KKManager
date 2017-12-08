/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/backend/applyList.html',
        '../models/Apply',
        '../models/ApplyCollection'],
    function(templateData,model,collection){
        return openbiz.View.extend({
            app:"mainapp",
            el:".main",
            collection:collection,
            events:{
                "click .btn-record-bh" 	: "bh" ,
                "click .btn-record-tg" 	: "tg"
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.collection = new collection();
                return this;
            },
            fetchList:function(){
                this.collection.fetch({reset:true});
            },
            bh:function(e)
            {
                e.preventDefault();
                var self = this;
                var recordId = $(e.currentTarget).attr('record-id');
                var model = this.collection.get(recordId);
                if (confirm("是否驳回?")==true)
                {
                    model.bh(function(success,data){
                        if(success)
                        {
                            self.fetchList();
                            alert(data.message);
                        }
                    });
                }
            },
            tg:function(e)
            {
                e.preventDefault();
                var self = this;
                var recordId = $(e.currentTarget).attr('record-id');
                var model = this.collection.get(recordId);
                if (confirm("是否通过?")==true)
                {
                    model.tg(function(success,data){
                        if(success)
                        {
                            self.fetchList();
                            alert(data.message);
                        }
                    });
                }
            },
            render:function()
            {
                var self = this;
                this.template = _.template(templateData);
                this.$el.html(this.template());
                var issueGrid = new Backgrid.Grid({
                    columns: [{
                        name: "username",
                        label: "昵称",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "realname",
                        label: "真实姓名",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "phone",
                        label: "手机号",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "weixin",
                        label: "微信号",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "fulltime",
                        cell: Backgrid.UriCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var value = parseFloat(model.get("fulltime"));
                                var tmp = value == 1 ? "全职" : "兼职";
                                this.$el.html(tmp);
                                return this;
                            }
                        }),
                        label: "工作状态",
                        sortable: false,
                        editable: false
                    }, {
                        name: "work_year",
                        label: "工作年限",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "id",
                        label: "操作",
                        cell: Backgrid.UriCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var value = model.get("_id");
                                var tmp = '<div class="tooltip-area"><a href="#" record-id="' + value + '"  class="btn btn-danger btn-sm btn-record-bh"><span><i class="glyphicon glyphicon-thumbs-down"></i>&nbsp; 驳回 &nbsp;</span></a><a href="#" record-id="' + value + '"  class="btn btn-success btn-sm btn-record-tg"><span><i class="glyphicon glyphicon-thumbs-up"></i>&nbsp; 通过 &nbsp;</span></a></div>';
                                this.$el.html(tmp);
                                self.delegateEvents();
                                return this;
                            }
                        }),
                        editable: false,
                        sortable: false
                    }],

                    collection: this.collection,
                    emptyText: "暂无数据",
                    className: 'table table-hover table-bordered text-center table-condensed',
                });
                var $paginator= $("#admin");
                $paginator.append(issueGrid.render().el);
                var paginator = new PageableCollection.Paginator({
                    windowSize: 10,
                    slideScale: 0.25,
                    goBackFirstOnSort: false,
                    collection: this.collection
                });

                $paginator.append(paginator.render().el);
                this.fetchList();
                return this;
            }
        });
    }
);