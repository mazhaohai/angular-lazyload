define(["require","angular","utils/moduleExtras","network/app-network.router"],function(require,ng,moduleExtras,routerCfg){
	var module = angular.module("app.network",['ui.router','myModule']);
	moduleExtras.call(module,routerCfg);
	return module;
});