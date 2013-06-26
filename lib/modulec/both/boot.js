console.log('lib/modulec/both/boot.js');
/**
 * Meteor Module C
 * 
 * @author particle4dev@gmail.com (Steve Hoang)
 * @version		0.1
 */

var root = this;
/**
 * Hang so luu tru ten App
 * @private 
 */
_APPNAME = '';
/**
 * CLASS de khoi tao 1 app. Thiet lap ten app, chay Deps.Dependency cho _isStart {only client}, config, module 
 * va khoi chay cac ham khoi tao {_init, _initClient, _initServer}
 * 
 * @param string name Name of the app
 * @param object obj  Doi tuong dinh nghia app 
 * @return	this module
 */
ModuleC = function(name, obj){	
	_APPNAME = name;	
	root[_APPNAME] = this;
	_.extend(this, obj);

	this._isStart = false;
	if (Meteor.isClient) {		
		this.deps = new Deps.Dependency;
		var app = root[_APPNAME];
		this.get = function () {
			app.deps.depend();
			return app._isStart;
		};
		this.set = function (value) {
			app._isStart = value;
			app.deps.changed();
		};
		this.checkStart = function () {			
			return app.get();
		};
		Deps.autorun(this.checkStart);
	}
	// Config object
	this['config'] = {};
	// Module store
	this['module'] = {};
	if ( this._init )
		this._init.apply(this);
	if (Meteor.isClient) {
		this._initClient();
		this.Layout._init();			
	}
	else if (Meteor.isServer) {
		this._initServer();
	}
}
/**
 * The function to start app. Kiem tra xem App da san sang khoi chay chua.
 * 	<ul>
 *	<li> Neu chua kiem tra cac module. Neu tat ca cac module san sang chuyen App sang san sang khoi chay 
 *		va goi lai ham _start
 *	<li> Neu roi khoi chay layout {only client}, cac module {on client and server} va cuoi la router {only client}
 *	</ul>
 */
ModuleC.prototype._start = function(){
	var modules = root[_APPNAME]['module'];
	if(this._isStart){			
		if (Meteor.isClient && this.Layout._start) {
			this.Layout._start();
		}
		_.each(modules, function(value, key){
			if(value._start)
				value._start();
		});
		if (Meteor.isClient && this.Router._start) {
			this.Router._start();
		}
		console.log("APP start");		
	}
	else{
		var module = moduleLoaded = 0;
		_.each(modules, function(value, key){
			module++;
			if(value.getReady())
				moduleLoaded++;
		});
		if(module == moduleLoaded && module != 0){
			if (Meteor.isClient) {
				this.set(true);
			}
			else {
				this._isStart = true;
			}
			this._start();
		}
	}		
}
/** 
 * Thiet lap 1 module vao trong App.
 * 
 * @param ns_string	
 * @param obj 
 * @return	this module
**/	
	ModuleC.prototype.Register = function (ns_string, obj) {
		var parts = ns_string.split('.'),
			parent = root[_APPNAME]['module'],
			i, len = parts.length-1;
		// strip redundant leading global
		if (parts[0] === _APPNAME) {
			parts = parts.slice(1);
			len -= 1;
		}
		for (i = 0; i < len; i += 1) {
			// create a property if it doesn't exist
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}			
			parent = parent[parts[i]];
		}					
		parent[parts[i]] = obj;

		return parent[parts[i]];
	};
	/** 
	 * Find a module
	 * 
	 * @param ns_string 
	 * @return		module
 	**/
	ModuleC.prototype.find = function (ns_string, callback, content, notFoundCallback) {
		var parts = ns_string.split('.'),
			parent = root[_APPNAME]['module'],
			i, len = parts.length;
		// strip redundant leading global
		if (parts[0] === _APPNAME) {
			parts = parts.slice(1);
			len -= 1;
		}
		for (i = 0; i < len; i += 1) {
			if (typeof parent[parts[i]] === "undefined") {
				if(_.isFunction(notFoundCallback))
					notFoundCallback();
				return null;
			}			
			parent = parent[parts[i]];
		}
		if(_.isFunction(callback)){
			if(content)
				return callback.call(content, parent);
			else
				return callback(parent);
		}
		return parent;
	};
	/** 
	 * Find modules 
	 * 
	 * @param ns_string 
	 * @return		module
 	**/
	ModuleC.prototype.finds = function () {
		var i = 0, len = arguments.length, callback, moduleLoaded =[], module, content;
		for(; i< len ;i++){
			if(_.isFunction(arguments[i])){
				callback = arguments[i];
			}				
			else if(_.isString(arguments[i])){
				module = root[_APPNAME].find(arguments[i]);
				if(module != null)
					moduleLoaded.push(module);
				else
					return null;
			}
			else if(_.isObject(arguments[i])){
				content = arguments[i];
			}			
		}
		if(!content){
			content = root[_APPNAME];
		}
		return callback.apply(content, moduleLoaded);
	};
	/**
	 config
	*/
	ModuleC.prototype.setConfigs = function(obj){
		_.extend(root[_APPNAME]['config'], obj);	
	};
	ModuleC.prototype.getConfig = function(name){
		return root[_APPNAME]['config'][name]; 
	};
	ModuleC.prototype.setConfig = function(name, value){
		root[_APPNAME]['config'][name] = value; 
	};
	/**
	 *
	 */
	ModuleC.prototype.toServer = function(path, method){
		var arrayArgs = [];
		var len = arguments.length;
		var callBack = null;
		for(var i=2; i<len; i++){
			if(_.isFunction(arguments[i])){
				callBack = arguments[i];
				continue;
			}
			arrayArgs.push(arguments[i]);
		}
		return Meteor.call('todo', path, method, arrayArgs, function (error, result){
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