define([],function(){
	var basePath = {
		cloud:globalConfig.appPath+"cloud/"
	}
	return {
		defaultRoutePath:"/",
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