define([ "../objects/Object" ], function(object) {
    return object.extend({
        _app: null,
        currentView: null,
        renderred: {},
        clearRender: function() {
            var keys = _.keys(this.renderred);
            for (var i in keys) {
                var viewName = keys[i];
                if (viewName.indexOf("system") == -1) {
                    var view = this.get(viewName);
                    if (view != null) {
                        view.close();
                    }
                    delete this.renderred[viewName];
                    delete view;
                }
            }
        },
        removeView:function(viewName){
            //var view = this.get(viewName);
            //if (view != null) {
            //    view.close();
            //}
            //delete this.renderred[viewName];
            //delete view;
        },
        isRenderred: function(viewName) {
            if (this.get(viewName) != null) {
                return true;
            }
            return false;
        },
        get: function(viewName) {
            if (this.renderred[viewName] == null || typeof this.renderred[viewName] == "undefined") {
                return null;
            }
            return this.renderred[viewName];
        },
        render: function(viewName) {
            var self = this;
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
            var viewArr = viewName.split(".");
            var viewPath = "./modules/" + viewArr[0] + "/views/" + viewArr[1];
            this._app.require([ viewPath ], function(targetView) {
                var view = new targetView();
                view.render.apply(view, args);
                if (viewArr[0] != "system") {
                    self.currentView = view;
                    openbiz.session.currentView = view;
                }
                self.renderred[viewName] = view;
                if (typeof callback == "function") {
                    callback(view);
                }
            });
        }
    });
});