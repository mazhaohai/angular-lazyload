define(["require","angular","utils/asynScript"],function(require,ng,asynScript){
	var module = ng.module("app.network");
	//var mymodule = ng.module("myModule");
	//console.log(mymodule);
	module.controller('NetworkCtrl', ['$scope','$injector','$modal','myFactory', function($scope,$injector,$modal){
		$scope.title = "NETWORK";
		$scope.defCtro = function(){
			asynScript(['javascript/app/network/testController.js'],function(){
				var modalInstance=$modal.open({
					template:"ssssss{{title}}",
					controller:"TestCtrl",
					backdrop:'static',
					size:"md"
				});
				modalInstance.result.then(function() {
				});
			})
		}
	}])
});