
	var root = this;
	ModuleC.prototype.Module = function(path, obj){
		var module = {
			data: {},
			path: path,
			setData: function(name, obj){
				this.data[name] = obj;
			},
			getData: function(name){
				return _.extend({}, this.data[name]);
			},
			validateData: function(name, obj){
				var result = this.getData(name);
				_.each(result, function(e, i){
					if(obj[i]){
						result[i] = obj[i];
					}
				}, this);
				return result;
			},
			implement: function(obj){
				_.extend(this, obj);
				this._init();
				if(this._start)
					this._start();
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