
"use strict";
define(['./modules/common/main','./modules/system/main','./modules/login/main','./modules/backend/main'],
    function (a,b,c,d)
    {
        return openbiz.Application.extend({
            appUrl:"https://app.coldsama.com:8443/api/v1/cms",
            name: 'mainapp',
            modules: [
                new a(),
                new b(),
                new c(),
                new d()
            ],
            init: function () {
                for (var i in this.modules) {
                    this.modules[i].init();
                }
            }
        });
    });