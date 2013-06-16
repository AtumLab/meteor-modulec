//if (Meteor.isServer) {	
	WEBAPP.find('Post').implement({
		_start: function(){
			this.makeChannel();
		},
		makeChannel: function(){			
			Meteor.publish("PostsChannel", function(page){
				page -= 1;
				if(page < 0) page = 0;
				var start = page * WEBAPP.getConfig('perPage');
				return Posts.find({}, {sort: { date: -1}, skip: start, limit: WEBAPP.getConfig('perPage')});
			});
		},
		create: function(newPost, callback){
			var id = Posts.insert(newPost, function(error, _id){
				if(!error && _.isFunction(callback)){
					// complete
					callback(_id);
					return _id;
				}
				else if(!error){
					// complete
					return _id;
				}
				else if(error){
					return error;
				}
			});
			return id;
		},
		remove: function(id){
			var result = Posts.remove({_id: id}, function(error){
				if(error){
					return error;
				}
			});
			if(!result){
				result = true;
			}
			return result;
		},
		getPage: function(){
			return Math.ceil(Posts.find({}).count() / WEBAPP.getConfig('perPage'));
		}
	});
//}