"use strict";

define(['backbone'],function(Backbone) {
    return Backbone.Router.extend({
        app: null,
        viewService: {},
        rendered: {},
        currentView: null,
        initialize: function() {
            if (typeof this.app == "string") this.app = openbiz.apps[this.app];
            return this;
        },
        renderView: function(viewName) {
            if (this.app == null) return;
            var callback, args = [];
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
            var self = this;
            var viewArr = viewName.split(".");
            if (openbiz.session.currentView != null && viewArr[0] != "system") {
                openbiz.session.currentView.undelegateEvents();
                openbiz.session.currentView.onClose();
                $(openbiz.session.currentView.el).fadeOut(function() {
                    if (self.app.viewService.isRenderred(viewName)) {
                        var view = self.app.viewService.get(viewName);
                        view.render();
                        view.delegateEvents();
                        openbiz.session.currentView = view;
                        $(view.el).fadeIn(function() {
                            if (typeof callback == "function") {
                                callback();
                            }
                        });
                        return;
                    }
                    self.app.viewService.render(viewName, args, function(view) {
                        $(view.el).fadeIn(function() {
                            if (typeof callback == "function") {
                                callback();
                            }
                        });
                    });
                });
            } else {
                if (self.app.viewService.isRenderred(viewName)) {
                    var view = self.app.viewService.get(viewName);
                    view.render();
                    view.delegateEvents();
                    openbiz.session.currentView = view;
                    $(view.el).fadeIn(function() {
                        if (typeof callback == "function") {
                            callback();
                        }
                    });
                    return;
                }
                self.app.viewService.render(viewName, args, function(view) {
                    $(view.el).fadeIn(function() {
                        if (typeof callback == "function") {
                            callback();
                        }
                    });
                });
            }
        }
    });
});