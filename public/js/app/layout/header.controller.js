define(["require","angular"],function(require,ng){
	var module = ng.module("app.layout");
	module.controller('HeaderCtrl', ['$scope','$state', function($scope,$state){
		$scope.goPage = _goPage;
		function _goPage(state){
			$state.go(state);
		}
	}])
});