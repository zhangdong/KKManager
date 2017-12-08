/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/backend/consultantList.html',
        '../models/Consultant',
        '../models/ConsultantCollection'],
    function(templateData,model,collection){
        return openbiz.View.extend({
            app:"mainapp",
            el:".main",
            collection:collection,
            events:{
                "click .btn-record-lh" 	: "lh",
                "click .introduction-content": "more"
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.collection = new collection();
                return this;
            },
            fetchList:function(){
                this.collection.fetch({reset:true});
            },
            more:function(e){
                e.preventDefault();
                var self = this;
                var recordId = $(e.currentTarget).attr('record-id');
                var model = this.collection.get(recordId);
                var value = model.get("introduction");
                if(_.isUndefined(value) || _.isNull(value) ) {
                    return;
                }
                if(value.length > 30) {
                    $("body").data('newRecordData',value);
                    this.popupView("backend.More");
                }
            },
            lh:function(e)
            {
                e.preventDefault();
                return;
                var self = this;
                var recordId = $(e.currentTarget).attr('record-id');
                var model = this.collection.get(recordId);
                if (confirm("是否拉黑?")==true)
                {
                    model.lh(function(success,data){
                        if(success)
                        {
                            //self.fetchList();
                        }
                    });
                }
            },
            render:function()
            {
                //（昵称，真是姓名，手机号，简介（字数会很多），在线状态（在线，忙碌，离线））。【拉黑】
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
                        className:"introduction-cell",
                        name: "introduction",
                        label: "简介",
                        cell: Backgrid.EmailCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var value = model.get("introduction");
                                var id = model.get("_id");
                                var tmp = '<div class="introduction-content" record-id="'+id+'">'+value+'</div>';
                                this.$el.html(tmp);
                                self.delegateEvents();
                                return this;
                            }
                        }),
                        editable: false,
                        sortable: false
                    },{
                        name: "online_status",
                        cell: Backgrid.UriCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var value = parseFloat(model.get("online_status"));
                                var tmp = value == 0 ? "在线" : "离线";
                                this.$el.html(tmp);
                                return this;
                            }
                        }),
                        label: "在线状态",
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
                                var tmp = '<div class="tooltip-area"><a href="#" record-id="' + value + '"  class="btn btn-sm btn-warning btn-record-lh"><span><i class="glyphicon glyphicon-eye-close"></i>&nbsp; 拉黑 &nbsp;</span></a></div>';
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
                var $paginator= $("#consultant");
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