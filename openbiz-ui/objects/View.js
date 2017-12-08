"use strict";

define(['backbone'],function(Backbone) {
    return Backbone.View.extend({
        app: null,
        name: null,
        parent: null,
        _dataId: null,
        initialize: function() {
            if (typeof this.app == "string") {
                this.app = openbiz.apps[this.app];
            }
            return this;
        },
        popupView: function(viewName) {
            if (this.app == null) return;
            var callback, args = [], self = this;
            switch (arguments.length) {
                case 2:
                    if (typeof arguments[1] == "function") {
                        callback = arguments[1];
                    } else if (typeof arguments[1] == "object") {
                        args = arguments[1];
                    }
                    break;

                case 3:
                    args = arguments[1];
                    callback = arguments[2];
                    break;
            }
            var parentView = openbiz.session.currentView;
            parentView.undelegateEvents();
            if (self.app.viewService.isRenderred(viewName)) {
                self.app.viewService.get(viewName).undelegateEvents();
            }
            var renderView = function(view){
                var $modal = $(view.$el.children()[0]);
                $("body").append($modal);
                view.parent = parentView;
                view.afterRender();
                $modal.modal({
                    backdrop: "static",
                    keyboard: false
                });
                $modal.on("shown.bs.modal", function() {
                    view.$el = $modal;
                    view.delegateEvents();
                });
                $modal.on("hidden.bs.modal", function() {
                    $("body").data('enablekey',"0");
                    view.$el.remove();
                    self.app.viewService.removeView(viewName);
                    openbiz.session.currentView = parentView;
                    parentView.delegateEvents();
                });
                if (typeof callback == "function") {
                    callback();
                }
            }
            //if (self.app.viewService.isRenderred(viewName)) {
            //    var view = self.app.viewService.get(viewName);
            //    view.render();
            //    renderView(view);
            //    return;
            //}
            self.app.viewService.render(viewName, args, function(view) {
                renderView(view);
            });
        }
    });
});