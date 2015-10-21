# angular-lazyload
angular lazyload module

angular seed project / lazyload module

bower install

gulp addLibs

node ./bin/www

注意：
1.在app.js文件中
  constant("FEATURE_STATES",[
		//"layout/app-layout.router",
		"cloud/app-cloud.router",
		"network/app-network.router"
	])
	不需要添加layout/app-layout.router的加载配置。
	由于在创建app模块时，
	define(["require","angular","angularAMD","bootstrap","angular-route","uiRouterExtras","layout/app-layout.module","utils/lazyHelper"],function(require,ng,angularAMD){....
	已经依赖加载了layout/app-layout.module，不需要再通过懒加载来加载它，否则会嵌套加载。
2.在引用模块时，需要用依赖加载进来的angular对象，代码中即ng，来获取module，
define(["require","angular"],function(require,ng){
	var module = ng.module("app.network");
	//var module = angular.module("app.network");
	module.controller('NetworkCtrl', ['$scope', function($scope){
		$scope.title = "NETWORK";
	}])
});
如果用angular，则提示module is undifine.
	
	
