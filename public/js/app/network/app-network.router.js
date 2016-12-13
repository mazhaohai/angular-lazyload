define([],function(){
	var basePath = {
		network:globalConfig.appPath+"network/"
	}
	return {
		defaultRoutePath:"/",
		routers:{
			"app.network":{
				url:"/network",
				abstract:true
			},
			"app.network.subnetwork":{
				url:"/sub",
				dependencies:[
					basePath.network+"network.controller.js"
				],
				views:{
					"content@app":{
						templateUrl:basePath.network+'network.html',
						controller:"NetworkCtrl"
					}
				}
			}
		}
	}
})