define(["utils/depResolve"],function(depResolve){
	return function(routerConfig){
		var self = this;
		this.config(['$stateProvider',
			'$urlRouterProvider',
			'$locationProvider',
			'$controllerProvider',
			'$compileProvider',
			'$filterProvider',
			'$provide',
			function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
				//多模块的异步加载时，无法满足模块controller、directive、service等动态定义
				//也就是说在加载完module文件后，再动态加载相关的controller、directive、service等时
				//提示controller、directive、service等未定义
				//所以必须在加载module文件同时在模块的config中注入相应的provider服务进行动态注册。
				self.controller = $controllerProvider.register;
				self.directive  = $compileProvider.directive;
				self.filter     = $filterProvider.register;
				self.factory    = $provide.factory;
				self.service    = $provide.service;
				if(!routerConfig) return;
				if(routerConfig.routers){
					angular.forEach(routerConfig.routers,function(router,path){
						var tempRouter={
							'url':router['url'],
							resolve:depResolve(router.dependencies)
						};
						if(router['views']){
							tempRouter['views']=router['views'];
						}else{
							if(router['templateUrl'])
								tempRouter['templateUrl']=router['templateUrl'];
							else
								tempRouter['template']=router['template'];
							tempRouter['controller']=router['controller'];
							tempRouter['parent']=router['parent'];
						} 
						if(router['abstract']){
							tempRouter['abstract']=router['abstract']; 
						}
						$stateProvider.state(path,tempRouter);
					});
				}
				if(routerConfig.defaultRoutePaths){
					$urlRouterProvider.otherwise(routerConfig.defaultRoutePaths);
				}
			}
		]);
	}
})