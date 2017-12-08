"use strict";

define(function() {
    return {
        load: function(apps, callback) {
            var loadedApps = [];
            apps.forEach(function(appName) {
                var appRequire = requirejs.config({
                    baseUrl: "/" + appName,
                    context: appName,
                    waitSeconds: 0,
                    paths: {
                        text: "text"
                    }
                });
                appRequire([ "./main" ], function(app) {
                    var app = new app();
                    app.require = appRequire;
                    app.viewService = new app.viewService();
                    app.viewService._app = app;
                    openbiz.apps[app.name] = app;
                    openbiz.loadedApps.unshift(app.name);
                    loadedApps.push(app);
                    if (loadedApps.length == apps.length) {
                        callback(loadedApps);
                    }
                });
            });
        }
    };
});