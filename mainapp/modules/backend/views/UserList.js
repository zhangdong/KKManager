/**
 * Created by ccMoving on 15/11/24.
 */
"use strict";

define(['text!templates/backend/userList.html',
        '../models/User',
        '../models/UserCollection'],
    function(templateData,model,collection){
        return openbiz.View.extend({
            app:"mainapp",
            el:".main",
            collection:collection,
            events:{
            },
            initialize:function(){
                openbiz.View.prototype.initialize.call(this);
                this.collection = new collection();
                return this;
            },
            fetchList:function(){
                this.collection.fetch({reset:true});
            },
            render:function()
            {
                var self = this;
                this.template = _.template(templateData);
                this.$el.html(this.template());
                var issueGrid = new Backgrid.Grid({
                    columns: [ {
                        name: "headurl",
                        label: "头像",
                        cell: Backgrid.UriCell.extend({
                            render: function () {
                                this.$el.empty();
                                var model = this.model;
                                var value = model.get("headurl");
                                if (_.isUndefined(value))
                                    value = "assets/img/a.jpg";
                                var tmp ='<img src="'+value+'" class="img-circle img-header">';;
                                this.$el.html(tmp);
                                self.delegateEvents();
                                return this;
                            }
                        }),
                        editable: false,
                        sortable: false
                    },{
                        name: "email",
                        label: "邮箱",
                        cell: "string",
                        sortable: false,
                        editable: false
                    },{
                        name: "username",
                        label: "昵称",
                        cell: "string",
                        sortable: false,
                        editable: false
                    }],

                    collection: this.collection,
                    emptyText: "暂无数据",
                    className: 'table table-hover table-bordered text-center table-condensed',
                });
                var $paginator= $("#user");
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