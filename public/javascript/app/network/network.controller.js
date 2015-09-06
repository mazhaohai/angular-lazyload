define(["require","angular"],function(require,ng){
	var module = ng.module("app.network");
	module.controller('NetworkCtrl', ['$scope', function($scope){
		$scope.title = "NETWORK";
	}])
});