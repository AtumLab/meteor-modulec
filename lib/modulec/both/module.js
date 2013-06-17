
	var root = this;
	ModuleC.prototype.Module = function(path, obj){
		var module = {
			data: {},
			path: path,
			view: {
				beforeView: function(){},
				default: function(){},
				afterView: function(){}
			},
			setData: function(name, obj){
				this.data[name] = obj;
			},
			getData: function(name){
				return _.extend({}, this.data[name]);
			},
			validateData: function(name, obj){
				var result = this.getData(name);
				result = this._validateData(result, obj);
				return result;
			},
			_validateData: function(baseObj, newObj){
				_.each(baseObj, function(e, i){
					if(newObj[i]){
						if(_.isFunction(newObj[i]))
							return;
						else if(_.isArray(newObj[i]) || _.isObject(newObj[i]))
							baseObj[i] = this._validateData(baseObj[i], newObj[i]);
						else
							baseObj[i] = newObj[i];
					}
				}, this);
				return baseObj;
			},
			implement: function(obj){
				_.extend(this, obj);
				this._init();
				if (Meteor.isClient && this._initClient) {
					this._initClient();
				}
				else if (Meteor.isServer && this._initServer) {
					this._initServer();
				}				
			},
			toServer: function(method){
				var arrayArgs = [];
				var len = arguments.length;
				var callBack = null;
				for(var i=1; i<len; i++){
					if(_.isFunction(arguments[i])){
						callBack = arguments[i];
						continue;
					}
					arrayArgs.push(arguments[i]);
				}
				return Meteor.call('todo', this.path, method, arrayArgs, function (error, result){
					if(callBack){
						callBack(error, result);
						return null;
					}
					if(error) {
						return error;
					}
					else {
						return result;
					}
				});
			}
				
		}
		_.extend(obj, module); 
		var m = root[root['AppName']].Register(path, obj);
		return m;
	};
