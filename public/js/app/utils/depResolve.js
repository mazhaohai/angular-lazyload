define(["require"],function(require){
	return function(dependencies){
		return {
			load:["$q","$rootScope",function($q,$rootScope){
				var defer = $q.defer();
				require(dependencies,function(){
					$rootScope.$apply(function(){
						defer.resolve();
					})
				})
				return defer.promise;
			}]
		}
	}
})