	//run before template create
	var root = this;
	/**
	 * Meteor Module C
	 * 
	 * @author		Steve Hoang <particle4dev>
	 * @version		0.1
	**/
	ModuleC = function(name, obj){
		root[name] = this;
		root['AppName'] = name;
		_.extend(root[name], obj);
		// config object
		root[root['AppName']]['config'] = {};
		if ( this._init )
			this._init.apply(this);
		if (Meteor.isClient) {
			this._initClient();
		}
		else if (Meteor.isServer) {
			this._initServer();
		}
	}
	ModuleC.prototype._start = function(){

	}
	/** 
	 * Set a module
	 * 
	 * @param ns_string	 
	 * @param obj 
	 * @return	this module
 	**/	
	ModuleC.prototype.Register = function (ns_string, obj) {
		var parts = ns_string.split('.'),
			parent = root[root['AppName']],
			i, len = parts.length-1;
		// strip redundant leading global
		if (parts[0] === AppName) {
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
			parent = root[root['AppName']],
			i, len = parts.length;
		// strip redundant leading global
		if (parts[0] === AppName) {
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
				module = root[root['AppName']].find(arguments[i]);
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
			content = root[root['AppName']];
		}
		return callback.apply(content, moduleLoaded);
	};
	/**
	 config
	*/
	ModuleC.prototype.setConfigs = function(obj){
		_.extend(root[root['AppName']]['config'], obj);  
	};
	ModuleC.prototype.getConfig = function(name){
		return root[root['AppName']]['config'][name]; 
	};
	ModuleC.prototype.setConfig = function(name, value){
		root[root['AppName']]['config'][name] = value; 
	};