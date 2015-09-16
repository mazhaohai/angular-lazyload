define(['require','angular'],function(require,ng){
	var module = ng.module("app.network");
	module.factory('NetworkSrv', ['$q', function($q){
		return function list(){
			alert("network");
		};
	}])
});