define(["require","angular","utils/asynScript"],function(require,ng,asynScript){
	var module = ng.module("app.network");
	module.controller('NetworkCtrl', ['$scope','$injector',function($scope,$injector){
		$scope.title = "NETWORK-watch";
	}])
});