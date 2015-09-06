(function(angular,undefined){
	"use strict";
	angular.module("my-module",[])
	.factory('myFactory', ['$q', function($q){
		return function name(){
			return {
				name:"mzh"
			}
		};
	}])
})(angular);