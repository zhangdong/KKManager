"use strict";
requirejs.config({
	paths:{
		'underscore'            : 'lib/underscore',
		'jquery' 	            : 'lib/jquery',
		'openbiz'	            : 'openbiz',
		'backbone'	            : 'vendor/backbone',
		'text'		            : 'lib/text',
		'async'   	            : 'lib/async',
		'bootstrap'             : 'lib/bootstrap',
		'store'         		: 'lib/store',
		'parsley'               : 'vendor/parsley',
		'backbone-pageable'     : 'vendor/backbone-pageable',
		'backgrid'              : 'vendor/backgrid',
		'backbone.listenFor'	: 'vendor/Backbone.listenFor',
		'datetimerange'			: "lib/daterangepicker",
		'moment'			    : "lib/moment-with-locales",
		'messenger'             : 'lib/messenger',
		'messenger.theme.flat'  : 'lib/messenger-theme-flat'
	},
	shim:{
		'backbone':{
			deps: [ 'underscore','jquery'],
			exports: 'Backbone'
		},
		'messenger':{
			deps: ["jquery"]
		},
		'messenger.theme.flat':{
			deps: ["messenger"]
		},
		'underscore':{
            exports: '_'
		},
		'bootstrap':{
			deps: ["jquery"]
		},
		'parsley':{
			deps: ["jquery"],
		},
		'datetime':{
			deps: ["jquery","moment"]
		},
		'backbone-pageable':{
			deps:['backbone']
        },
		'backgrid':{
			deps:["backbone"]
        },
		'backbone.listenFor':{
			deps:['backbone']
		},
		'openbiz':{
			deps: ['underscore','jquery','backbone.listenFor','datetimerange']
		}
	}
});

define(['openbiz',"async",'bootstrap','store',"moment",'backbone-pageable','backgrid','parsley','datetimerange','messenger.theme.flat'],
	function(openbiz,async,c,store,moment,PageableCollection,Backgrid,parsley,datetimerange,messengert){
        window.datetimerange = datetimerange;
        window.parsley = parsley;
        window.PageableCollection = PageableCollection;
        window.Backgrid = Backgrid;
		window.openbiz = openbiz;
		window.async = async;
		window.moment = moment;
		window.store = store;

        openbiz.init();
        var appRouter = new openbiz.Router();
		// trigger event for onOpenbizLoaded
		if( typeof openbizEventsDelegate =='object' &&
			typeof openbizEventsDelegate.onOpenbizLoaded =='function' ){
			openbizEventsDelegate.onOpenbizLoaded.apply(this);
		}else{
			Backbone.history.start();
		}
	}
);