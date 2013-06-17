if (Meteor.isClient) {
	/**
	 Workflow
	 implement => _init => _bindRoutes => route
	 _start => _processRequest 
	 to => _processRequest
	/**
	 * Route 
	 * 
	 * @author		Steve Hoang <particles4dev>
	 * @version
	 */
	var root = this;
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	// Cached regex for stripping a leading hash/slash and trailing space.
	var routeStripper = /^[#\/]|\s+$/g;

	var Route = function(route, callback, name, routerModule){
		this.route = route;
		this.callback = callback;
		this.name = name;
		this.routerModule = routerModule;
		this.loadURL = function(fragment){
			var arg = this._extractParameters(this.route, fragment);
			var result = !!(this.routerModule._applyFilters(name));
			if(result)
				callback.apply(this.routerModule, arg);
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
		_init: function(){}
	})
	
	ModuleC.prototype.Router = {};
	_.extend(ModuleC.prototype.Router, {
		/**
		 Ham khoi tao
		*/
		_init : function(){
			this.App = root[root['AppName']];
			this.handlers = [];
			// url hien tai
			this.fragment = null;
			// filters
			this.filters = {};
			// 
			this._activeFilters = [];
			// Ensure that `History` can be used outside of the browser.
			if (typeof window !== 'undefined') {
				this.location = window.location;
				this.history = window.history;
			}
			this._bindRoutes();
			console.log('Router._init');
			console.log(this);
		},
		/**
		 Chuyen doi dang route don gian sang RegExp
		*/
		_routeToRegExp : function (route) {
			route = route.replace(escapeRegExp, '\\$&')
				.replace(optionalParam, '(?:$1)?')
				.replace(namedParam, function (match, optional) {
				return optional ? match : '([^\/]+)';
			}).replace(splatParam, '(.*?)');
			return new RegExp('^' + route + '$');
		},
		/** 
		 * Chuyen tat ca cac router
		 * Private
		 **/
		_bindRoutes : function(){
			if (!this.routes) return;
			for (var i in this.routes) {
				var route = this.routes[i];
				this.route(i, route);
			}
		},
		/**
			Dang ky 1 route
		 */
		route : function(route, name){
			if (!_.isRegExp(route)) route = this._routeToRegExp(route);
			// dat len dau
			var callback = (_.isString(name)) ? this[name]: name;
			this.handlers.unshift(new Route(route, callback, name, this));
			return this;
		},
		/**
		 Chuyen url
		*/
		to : function(url){
			if(url != this.fragment){
				if(this.isHash)
					url = '#'+url;
				this.history.pushState({}, document.title, url);
				this.fragment = url;
			}			
			this._processRequest();
			return this;
		},
		_processRequest : function(){
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
		},
		back : function(){
			this.history.back();
			return this;
		},
		forward : function(){
			this.history.forward();
			return this;
		},
		getFragment : function () {
			var fragment;
			if(!this.isHash){
				fragment = this.location.pathname;
				if (!fragment.indexOf('/')) fragment = fragment.substr('/'.length);
			}
			else
				fragment = this.getHash();
			// bo di ky tu # hay / o dau
			fragment.replace(routeStripper, '');
	 		return fragment;
		},
		// lay cac link url dang localhost:3000/#product/attribute/value
		getHash : function (window) {
				var match = (window || this).location.href.match(/#(.*)$/);
				return match ? match[1] : '';
		},
		/**
		trien khai
		*/
		implement : function(obj){
			_.extend(this, obj);
			this._init();
			return this;
		},
		/**
		 Filters
		 */
		addFilters : function(obj){
			_.extend(this.filters, obj);
			return this;
		},
		setFilter : function(name, options){
			options = options || {};
				options.name = name;
				if (options.only && ! _.isArray(options.only))
					options.only = [options.only];
				if (options.except && ! _.isArray(options.except))
			 		options.except = [options.except];
			
				this._activeFilters.push(options);
				return this;
		},
		// run all filters over page
		_applyFilters : function(page) {
			var self = this;
			return _.reduce(self._activeFilters, function(page, filter) {
				return self._applyFilter(page, filter)
			}, page);
		},
		// run a single filter (first check only and except apply)
		_applyFilter : function(page, filter) {
			var apply = true;
			if (filter.only) {
				apply = _.include(filter.only, page);
			} else if (filter.except) {
				apply = ! _.include(filter.except, page);
			}
						
			if (apply) {
				return this.filters[filter.name](page);
			} else {
				return page;
			}
		},
		/**
		khoi chay
		*/
		_start : function(){
			this._processRequest();	
		}
	});
}
