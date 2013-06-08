//if (Meteor.isClient) {
	// HELPERS
	Template.page.helpers({
		posts: function () {
			return WEBAPP.find('Post').getAll();
		},
		select: function(id){
			var sp = Session.get('selectPost');
			if(sp && id == sp._id){
				return 'select';
			}		
			return '';
		}
	});
	Template.display_post.helpers({		
		post: function () {
			return [Session.get('selectPost')];
		}
	});

	// EVENTS
	Template.page.events({
		'click .postTitle_meth': function(e, t){
			e.preventDefault();
			WEBAPP.find('Post').select(this._id);
		},
		'click .switchLayout_meth': function(e, t){
			e.preventDefault();
			if(WEBAPP.Layout.currentLayout('main.layout2') != 'edit_post'){
				WEBAPP.Layout.switchLayout('main.layout2', 'edit_post', function(){
					$(this.find('.main-title')).html('UPDATE');
				});				
			}				
			else{								
				WEBAPP.Layout.showLoading('main.layout2', function(){
					WEBAPP.Layout.switchLayout('main.layout2', 'add_post', function(){});
				}, true);
			}				
		}
	});	
	Template.display_post.events({
		'click .remove_meth': function(e, t){
			e.preventDefault();
			var id = this._id;
			WEBAPP.find('Post', function(pm){
				pm.toServer('remove', id, function(error, result){
					if(error) {
						WEBAPP.find('Error', function(em){
							console.log(error);
							em.showErrorDialogue().push(error);
						});
					}
					else if(result == true){
						var sId = Session.get('selectPost')._id;
						if(sId == id){
							Session.set('selectPost', pm.getFirst());
						}						
					}
				});
			});			
		}
	});
	Template.add_post.events({
		'click button.btn': function(e, t){
			e.preventDefault();
			WEBAPP.find('Post', function(pm){
				var nPost = pm.validateData('PostModel', {
					title: t.find('input.title').value,	
					content: t.find('textarea.content').value,
					description: t.find('input.description').value
				});
				// ERROR
				//pm.path = "none_module";
				pm.toServer('create', nPost, function(error, result){
					if(error) {
						WEBAPP.find('Error', function(em){
							console.log(error);
							em.showErrorDialogue().push(error);
						});
					}
					else {
						t.find('input.title').value = "";
						t.find('textarea.content').value = "";	
						t.find('input.description').value = "";	
					}
				});
			});			
		}
	});
	Template.effect_real.events({
		'click button.back': function(e, t){
			e.preventDefault();
			WEBAPP.Layout.showLoading('effect_real.layout3', true);
			WEBAPP.Layout.switchLayout('effect_real.layout3', 'page', function(){});
		},
		'click button.face': function(e, t){
			e.preventDefault();
			WEBAPP.Layout.hideLoading('effect_real.layout3');
			WEBAPP.Layout.switchLayout('effect_real.layout3', 'add_post', function(){});
		}
	});
	// code to run on client at startup
	WEBAPP.find('Post').implement({
		_start: function(){
			Session.setDefault('pagePost', 1);
			Session.setDefault('selectPost', null);
			this.getChannel();
		},
		getChannel: function(){
			var self = this;
			Deps.autorun(function () {
				Meteor.subscribe("PostsChannel", [Session.get('pagePost')], function () {
					console.log("PostsChannel subscription complete!");
					Session.set('selectPost', self.getFirst());
				});
			});
		},
		getFirst: function(){
			return Posts.findOne({}, {sort: { date: -1}});
		},
		getAll: function(){
			return Posts.find({}, {sort: { date: -1}});
		},
		select: function(id){
			Session.set('selectPost', Posts.findOne({_id: id}, {sort: { date: -1}}));
			return this;
		}
	});	
//}