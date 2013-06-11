if (Meteor.isClient) {
	/**
	 * Route 
	 * 
	 * @author		Steve Hoang <particles4dev>
	 * @version
	 */
	var root = this;
	var Route = function(route, callback){
		this.route = route;
		this.callback = callback;
		this.loadURL = function(fragment){
			var arg = this._extractParameters(this.route, fragment);
			callback.apply(null, arg)
		},
		this._extractParameters = function (route, fragment) {
			var params = route.exec(fragment).slice(1);
			return _.map(params, function (param) {
				return param ? decodeURIComponent(param) : null;
			});
		}
	};
	_.extend(Route.prototype, {
		module: null,
		reg: '',
		_init: function(){

		}
	})
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	ModuleC.prototype.Router = {};
	/**
	 Chuyen doi dang route don gian sang RegExp
	*/
	ModuleC.prototype.Router._routeToRegExp = function (route) {
		route = route.replace(escapeRegExp, '\\$&')
			.replace(optionalParam, '(?:$1)?')
			.replace(namedParam, function (match, optional) {
			return optional ? match : '([^\/]+)';
		}).replace(splatParam, '(.*?)');
		return new RegExp('^' + route + '$');
	};
	/**
	 Ham khoi ta0
	*/
	ModuleC.prototype.Router._init = function(){
		this.App = root[root['AppName']];
		this.handlers = [];
		// url hien tai
		this.fragment = null;
		// Ensure that `History` can be used outside of the browser.
		if (typeof window !== 'undefined') {
			this.location = window.location;
			this.history = window.history;
		}
		this._bindRoutes();
		console.log('Router._init');
		console.log(this);
	};
	/** 
	 * Chuyen tat ca cac router
	 * Private
	 **/
	ModuleC.prototype.Router._bindRoutes = function(){
		if (!this.routes) return;
		for (var i in this.routes) {
			var route = this.routes[i];
			this.route(i, route);
		}
	};
	/**
		Dang ky 1 route
	 */
	ModuleC.prototype.Router.route = function(route, name){
		if (!_.isRegExp(route)) route = this._routeToRegExp(route);
		// dat len dau
		var callback = (_.isString(name)) ? this[name]: name;
		this.handlers.unshift(new Route(route, callback));
	};
	/**
	 Chuyen url
	*/
	ModuleC.prototype.Router.to = function(url){
		if(url != this.fragment){
			this.history.pushState({}, document.title, url);
			this.fragment = url;
		}			
		this._processRequest();
		return this;
	};
	ModuleC.prototype.Router._processRequest = function(){
		var fragment = this.getFragment();
		_.any(this.handlers, function (handler) {
			//console.log(fragment);
			//console.log(handler);
			if (handler.route.test(fragment)) {
				//console.log('test');
				handler.loadURL(fragment);
				return true;
			}
		});
	};	
	ModuleC.prototype.Router.back = function(){
		this.history.back();
		return this;
	};
	ModuleC.prototype.Router.forward = function(){
		this.history.forward();
		return this;
	};
	ModuleC.prototype.Router.getFragment = function () {
		var fragment = this.location.pathname;
		if (!fragment.indexOf('/')) fragment = fragment.substr('/'.length);	  
 		return fragment;
	};
	/**
	trien khai
	*/
	ModuleC.prototype.Router.implement= function(obj){
		_.extend(this, obj);
		this._init();				
	};
	/**
	khoi chay
	*/
	ModuleC.prototype.Router._start = function(){
		this._processRequest();	
	}
}