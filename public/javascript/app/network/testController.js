define(['require','angular'],function(require,ng){
	var module = ng.module("app.network");
	module.controller('TestCtrl', ['$scope', function($scope){
		$scope.title ="dialog";
	}])
});