if (Meteor.isClient) {	
	ModuleC.prototype._initClient = function(){		
		this.Layout._init();
	}		
	ModuleC.prototype._start = function(){		
		console.log('APP start on the client !');
	}

}