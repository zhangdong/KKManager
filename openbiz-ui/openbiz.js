"use strict";
define(["objects/Object",
        "objects/Module",
        "objects/Application",
        "objects/Router",
        "objects/MiddleWareRouter",
        "objects/View",
        "loaders/AppLoader",
        "utils/HistoryInit"
    ],
    function(Object,
             Module,
             Application,
             Router,
             MiddleWareRouter,
             View,
             AppLoader,
             historyInit
    ){
        return {
            apps:{},
            loadedApps:[],
            session:{},
            baseUrl:"./openbiz-ui",
            //shortcut alias
            Application: Application,
            Module: Module,
            Object: Object,
            Router: Router,
            MiddleWareRouter:MiddleWareRouter,
            View: 	View,
            loadApps: AppLoader.load,
            historyInit: historyInit,
            init:function(){
                this.historyInit();
            }
        }
    });