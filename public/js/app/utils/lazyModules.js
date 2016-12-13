define([],function(){
	return {
		lazyCfg:[
		{
			"stateName":"app.cloud",
            "urlPrefix":"/cloud",
            "type":"ngload",
            "src":globalConfig.appPath+'cloud/app-cloud.module.js'
		},
		{
			"stateName":"app.network",
            "urlPrefix":"/network",
            "type":"ngload",
            "src":globalConfig.appPath+'network/app-network.module.js'
		}
		]
	}
})
