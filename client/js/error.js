//if (Meteor.isClient) {
	Template.error_message.helpers({
		error: function(){
			return Session.get('errorCurrent');
		}
	});	
	// it only on client
	new WEBAPP.Module('Error',{
		_init : function(){
			Session.setDefault('errorCurrent', null);
			this.errorStore = [];
		}
	}).implement({
		_start: function(){
			
		},
		push: function(error){
			this.errorStore.push(error);
			Session.set('errorCurrent', error);
			return this;
		},
		pop: function(){
			return this.errorStore.pop();
		},
		showErrorDialogue: function(){			
			$('#error-message').modal('show');
			return this;
		}
	});
//}