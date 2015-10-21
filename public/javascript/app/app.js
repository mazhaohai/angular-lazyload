define(["require","angular","angularAMD","angular-route","angular-bootstrap","bootstrap","uiRouterExtras","layout/app-layout.module","utils/lazyHelper",'utils/test-module'],function(require,ng,angularAMD){
	return angular.module('app', [
		'ui.router',
		'ui.bootstrap',
		'ct.ui.router.extras',
		'myModule',
		'app.layout',
		'app.lazyHelper'
		]
	).constant("FEATURE_STATES",[
		//"layout/app-layout.router",
		"cloud/app-cloud.router",
		"network/app-network.router"
	]).config(['$futureStateProvider','$locationProvider',function($futureStateProvider,$locationProvider) {
	    var loadAndRegisterFutureStates = ["$http","lazyHerper",function ($http,lazyHerper) {
	      return lazyHerper.getLazyModuleCfg().then(function(moduleCfg){
	          angular.forEach(moduleCfg, function (cfg) {
	            $futureStateProvider.futureState(cfg);
	          });
	      });
	    }];

	    $futureStateProvider.stateFactory('ngload', ngloadStateFactory); // register AngularAMD ngload state factory
	    $futureStateProvider.stateFactory('iframe', iframeStateFactory); // register silly iframe state factory
	    $futureStateProvider.stateFactory('requireCtrl', requireCtrlStateFactory); // Register state factory that registers controller via eval.
	      
	    $futureStateProvider.addResolve(loadAndRegisterFutureStates);
	}]);
	function requireCtrlStateFactory($q, futureState) {
	    var d = $q.defer(); // make a deferred

	    // Tell RequireJS to load lazyController 
	    // (leave off the .js)
	    require([featureState.lazyCfg], function (lazyController) {
	      // RequireJS asynchronousely gives us the result of 
	      // lazyController.js as the 'lazyController' parameter

	      // Define the full UI-Router state using the 
	      // lazyController and the injected futureState 
	      var fullstate = { controller: lazyController,
	        name: futureState.stateName,
	        url: futureState.urlPrefix,
	        templateUrl: futureState.templateUrl
	      };

	      // Resolve the promise with the full UI-Router state.
	      d.resolve(fullstate);
	    });
	    
	    // The state factory returns the promise
	    return d.promise;
	}
	  
	function iframeStateFactory ($q, futureState) {
	    var state = {
	      name: futureState.stateName,
	      template: "<iframe src='" + futureState.src + "'></iframe>",
	      url: futureState.urlPrefix
	    };
	    return $q.when(state);
	}

	function ngloadStateFactory($q, futureState) {
	    var ngloadDeferred = $q.defer();
	    require([ "ngload!" + futureState.src , 'ngload', 'angularAMD'],
	        function ngloadCallback(result, ngload, angularAMD) {
	          angularAMD.processQueue();
	          ngloadDeferred.resolve(undefined);
	        });
	    return ngloadDeferred.promise;
	}
});