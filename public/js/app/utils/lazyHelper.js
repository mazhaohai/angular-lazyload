define(['require', 'angular', "utils/lazyModules"], function(require, ng, modules) {
	var lazyHerper = angular.module('app.lazyHelper', []);
	lazyHerper.factory('lazyHerper', ['$q',
		function($q) {
			var service = {
				getLazyModuleCfg: function() {
					var deferred = $q.defer();
					if(modules) {
						var temp = []
						for(var i = 0, len = modules.lazyCfg.length; i < len; i++) {
							temp.push(modules.lazyCfg[i]);
						}
						deferred.resolve(temp);
					} else {
						deferred.reject();
					}
					return deferred.promise;
				}
			}
			return service;
		}
	]);
	return lazyHerper;
});