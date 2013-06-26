/**
 * Module
 *
 * @author  Steve Hoang <particle4dev@gmail.com>
 * @license 
 * @link	update
 * @package both <client, server>
 * @version 0.1
 *
 */
var root = this;
/**
 * Module class
 * _private
 */
ModuleC.prototype._ModulePrototype = function(){
	this.App = root[_APPNAME];
	/** Store models */
	this.data = {};
	/** Link to module */
	this.path = '';	
	/** Display page */
	this.view = {
		beforeView: function(){},
		default: function(){},
		afterView: function(){}
	};
	/**
	 * Set Model
	 *
	 * @param string name Name of model
	 * @param object obj Data of model 
	 * @return this
	 */
	this.setData = function(name, obj){
		this.data[name] = obj;
		return this;
	};
	/**
	 * Get Model
	 *
	 * @param string name Name of model
	 * @return object obj Data of model
	 */
	this.getData = function(name){
		return _.extend({}, this.data[name]);
	};		
	this.validateData = function(name, obj){
		var result = this.getData(name);
		result = this._validateData(result, obj);
		return result;
	};
	this._validateData = function(baseObj, newObj){
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
	};
	this.implement = function(obj){
		_.extend(this, obj);
		if (this._init) {
			this._init();
		}		
		if (Meteor.isClient && this._initClient) {
			this._initClient();
		}
		else if (Meteor.isServer && this._initServer) {
			this._initServer();
		}				
	};
	this.toServer = function(method){
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
	};			
};
ModuleC.prototype.Module = function(path, obj){
	var module = new root[_APPNAME]._ModulePrototype();
	_.extend(obj, module);
	obj.path = path;
	if(Meteor.isClient) {
		/** Check module is ready:
			CLient: subscribe channel
			Server: publish channel
		 */
		Session.setDefault('isReady'+path, false); 

		obj.setReady = function(bool){
			if(this.getReady() != bool){
				Session.set('isReady'+this.path, bool);
				if(bool === true)
					this.App._start(); 
			}			
			return this;
		};
		obj.getReady = function(){
			return Session.get('isReady'+this.path);
		};	
	}
	if(Meteor.isServer) {
		obj.isReady = false; 

		obj.setReady = function(bool){
			if(this.getReady() != bool){
				obj.isReady = bool;
				if(bool === true)
					this.App._start(); 
			}			
			return this;
		};
		obj.getReady = function(){
			return this.isReady;
		};
	}
	var m = root[_APPNAME].Register(path, obj);
	return m;
};