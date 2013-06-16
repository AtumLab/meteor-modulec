console.log('lib/modulec/server/boot.js');
if (Meteor.isServer) {
	var root = this;
	Meteor.methods({
		todo: function(module, method, arrayArgs){			
			return root[root['AppName']].find(module, function(m){
				if(m[method] && _.isFunction(m[method])){
					return m[method].apply(m, arrayArgs);
				}
				else if(!m[method]){					
     				throw new Meteor.Error(501, "the method isn't implemented");
				}
				else if(!_.isFunction(m[method])){
					throw new Meteor.Error(503, "the method isn't a function");
				}
			}, null, function(){
				throw new Meteor.Error(501, "not found "+module+" module");
			});
		}
	});
	ModuleC.prototype._initServer = function(){		
		console.log('_initServer on the server !');
	}
	ModuleC.prototype._start = function(){
		console.log('APP start on the server !');
	}
}