if (Meteor.isClient) {
	// Handlebars HELPER
	if (typeof Handlebars !== 'undefined') {
		Handlebars.registerHelper('mainLayout', function() {
			return new Handlebars.SafeString(Template[root[root['AppName']].mainLayout]());
		});
	}
	// 
	var uid  = ['0', '0', '0'];
	function nextUid() {
		var index = uid.length;
		var digit;
		while(index) {
			index--;
			digit = uid[index].charCodeAt(0);
			if (digit == 57 /*'9'*/) {
				uid[index] = 'A';
				return uid.join('');
			}
			if (digit == 90/*'Z'*/) {
				uid[index] = '0';
			} else {
				uid[index] = String.fromCharCode(digit + 1);
				return uid.join('');
			}
		}
		uid.unshift('0');
		return uid.join('');
	}
	// LAYOUT
	var root = this;
	ModuleC.prototype.Layout = {};
	ModuleC.prototype.Layout.template = Template;
	_.extend(ModuleC.prototype.Layout, {
		_init: function(){
			console.log('Layout _init');
			var self = this;
			/**
			 * Them cac thanh phan can thiet vao moi template
			 */
			// noi chua noi dung bo cuc trang
			this.composition = {};
			_.each(this.template, function(v, i){			
				this.composition[i] = {};
				v.name = i;
				// Ham chay 1 lan sau khi template xong;
				v.renderedOne = [];
				// Ham luon chay sau khi template xong;
				v.renderedMany = [];
				v.created = function(){
					console.log(i+' created');
				};
				v.rendered = function(){
					console.log(i+' rendered');
					var that = this;
					v.templateObject = this;
					_.each(v.renderedOne, function(func){						
						func.call(that);
					}, v);
					// reset
					v.renderedOne = [];
					_.each(v.renderedMany, function(func){						
						func.call(that);
					}, v);
				};
				v.helpers({
					layout: function(name, dl) {
						dl = dl.split('#');
						var effect = dl[1], htmlResult = "";
						dl = dl[0];
						var id = name+nextUid();
						self.composition[i][name] = {
							default: dl,
							current: dl,
							id: id,
							effect: effect,
							stateEffect: false
						}
						if(effect == 'flip01'){
							htmlResult = '<div id="'+id+'" data-loading="false" style="position: relative; clear: both;">'+
							'<div class="artwork transform3d">'+
								'<div class="artwork__flipContainer g-transform-3d g-transform-origin__right">'+
									'<div class="artwork__flipFace __flipFace">'+
										self.template[dl]()+
									'</div>'+
									'<div class="artwork__flipFace artwork__flipBack __flipBack">'+
										
									'</div>'+
								'</div>'+
							'</div>'+
							'</div>';
						}
						else{
							htmlResult = '<div id="'+id+'" data-loading="false" style="position: relative; clear: both;">'+self.template[dl]()+'</div>';
						}							
						return new Handlebars.SafeString(htmlResult);
					}			
				});
			}, this);
			console.log(this);
		}
	});
	
	/** 
	 * Thay doi layout trong 1 template bang 1 template khac
	 * 
	 * @param layout : ten template va layout can thay, ngan cach boi dau "." example "left.menu" nghia la thay doi template
	 * left o vi tri menu
	 * @param template#effect : ten template day vao thay doi#effect
	 * @param callback : ham su ly khi rendered xong
	 * @param isLoop   : true : chi lap vong 1 lan; false : them lap vong mai mai [default : true]
	 * @return	true   : load 
	 *			false  : is loaded
 	**/
	ModuleC.prototype.Layout.switchLayout = function(layout, template, callback, isLoop){ 
		layout = layout.split('.');
		var main = layout[0];
		layout = layout[1];
		if(!isLoop && isLoop != false){
			isLoop = true;
		}
		//if template is ready loaded
		if(this.composition[main][layout].current == template && callback){
			callback.call(this.template[template].templateObject);
			return false;
		}
		if(callback){	
			if(isLoop == true){
				this.template[template].renderedOne.push(callback);
			}
			else if(isLoop == false){
				this.template[template].renderedMany.push(callback);				
			}
		}
		//Meteor.render save my life
		var objTemp = Meteor.render(this.template[template]);
		//Effect
		var container = $("#"+this.composition[main][layout].id);
		switch(this.composition[main][layout].effect){
			case 'flip01':
				if(!this.composition[main][layout].stateEffect){
					container.find('.__flipBack').html(objTemp);
					container.find('.artwork.transform3d').addClass('flipped');
					this.composition[main][layout].stateEffect = true;
				}
				else{
					container.find('.__flipFace').html(objTemp);
					container.find('.artwork.transform3d').removeClass('flipped');
					this.composition[main][layout].stateEffect = false;
				}					
				break;
			case 'flip02': 
				break;
			case 'flip03': 
				break;
			default:
				container.html(objTemp);
				break;	
		}		
		this.composition[main][layout].current = template;
		return true;
	};
	ModuleC.prototype.Layout.currentLayout = function(layout){
		layout = layout.split('.');
		var main = layout[0];
		layout = layout[1];		
		return this.composition[main][layout].current;
	};
	/**
	 *
	**/
	ModuleC.prototype.Layout.showLoading = function(){
		// get args
		var layout, layoutName, isHidden, len = arguments.length;//, callback;
		for(var i = 0; i< len; i++){
			if(_.isString(arguments[i])){
				layout = arguments[i];
				layoutName = layout;
			}
			//else if(_.isFunction(arguments[i]))
				//callback = arguments[i];
			else if(_.isBoolean(arguments[i]))
				isHidden = arguments[i];
		}		
		layout = layout.split('.');
		var main = layout[0];
		layout = layout[1];				
		var layoutDiv = $('#'+this.composition[main][layout].id),
		hiddenLayout = '';
		//if layout is ready show loading 
		if(layoutDiv.attr('data-loading') == 'true')
			return;
		if(isHidden)
			hiddenLayout = '<div class="fade-in" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 1040; background-color: #000000;-webkit-transition: opacity 0.15s linear;-moz-transition: opacity 0.15s linear;-o-transition: opacity 0.15s linear;transition: opacity 0.15s linear;opacity: 0.8;filter: alpha(opacity=80);"></div>';
		var loading = $('<div/>', {
			id: '',
			class: 'loader-container',
			html: '<div style="position: absolute; right: 0px; top: 0px; z-index: 1041; width: 40px; height: 40px; display: block; background-color: rgb(50, 162, 55); background-position: initial initial; background-repeat: initial initial;">'+								
						'<img id="MetroPreLoader_crazyloader" src="/loader_white.gif" style="width: 100%; height: 100%;">'+
					'</div>'+
					hiddenLayout
		}).appendTo(layoutDiv.attr('data-loading', 'true')).ready(function(){
			/**
			if(callback){				
				var self = this;
				setTimeout(function(){
					callback();
					self.hideLoading(layoutName);
				}, 500);
			}
			*/
		});	
	};
	ModuleC.prototype.Layout.hideLoading = function(layout){
		layout = layout.split('.');
		var main = layout[0];
		layout = layout[1];
		var layoutDiv = $('#'+this.composition[main][layout].id);
		//if layout doesn't load 
		if(layoutDiv.attr('data-loading') == 'false')
			return;			
		layoutDiv.delay(5000).attr('data-loading', 'false').find('.loader-container').remove();
	};
	// register helper
	ModuleC.prototype.Layout.registerHelper = function(name, func){
		if (typeof Handlebars !== 'undefined') {
			Handlebars.registerHelper(name, func);
		}
	};	
}