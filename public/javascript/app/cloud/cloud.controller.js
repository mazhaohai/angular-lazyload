define(["require","angular"],function(require,ng){
	var module = ng.module("app.cloud");
	module.controller('CloudCtrl', ['$scope', function($scope){
		$scope.title = "CLOUD";
	}])
});