define([],function(){
	var basePath = {
		cloud:globalConfig.appPath+"cloud/"
	}
	return {
		defaultRoutePath:"/",
		lazyCfg:{
			"stateName":"app.cloud",
            "urlPrefix":"/cloud",
            "type":"ngload",
            "src":basePath.cloud+'app-cloud.module.js'
		},
		routers:{
			"app.cloud":{
				url:"/cloud",
				dependencies:[
					basePath.cloud + "cloud.controller.js"
				],
				views:{
					"content@app":{
						templateUrl:basePath.cloud+"cloud.html",
						controller:"CloudCtrl"
					}
				}
			}
		}
	}
})