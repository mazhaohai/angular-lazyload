define(['require','angular',"utils/moduleExtras"],function(require,ng,moduleExtras){
	var module = angular.module('myModule',[]);
	moduleExtras.call(module);
	module.factory('myFactory', ['$q', function($q){
		return {
			name:"mzh"
		};
	}]);
	return module;
})