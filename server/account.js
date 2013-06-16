//if (Meteor.isServer) {	
	WEBAPP.find('Account').implement({
		_start: function(){
			
		},
		create: function(Object){
			var result = Accounts.createUser(Object);
			console.log(result);
			return result;
		}
	});
//}