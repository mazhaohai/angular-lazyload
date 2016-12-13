define(["require","angular","utils/moduleExtras","layout/app-layout.router"],function(require,ng,moduleExtras,routersCfg){
	var module = angular.module("app.layout",["ui.router"]);
	moduleExtras.call(module,routersCfg);
	return module;
});