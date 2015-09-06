define(["require","angular","ngload","cloud/app-cloud.router","utils/moduleExtras"],function(require,ng,ngload,routerCfg,moduleExtras){
	var module = angular.module("app.cloud",["ui.router"]);
	moduleExtras.call(module,routerCfg);
	return module;
})