"use strict";define(["./modules/common/main","./modules/system/main","./modules/login/main","./modules/backend/main"],function(n,e,i,m){return openbiz.Application.extend({appUrl:"https://app.coldsama.com:8443/api/v1/cms",name:"mainapp",modules:[new n,new e,new i,new m],init:function(){for(var n in this.modules)this.modules[n].init()}})});