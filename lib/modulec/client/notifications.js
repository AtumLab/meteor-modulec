if (Meteor.isClient) {
	var root = this;
	var Message = function(){

	}
	Message.prototype = Meteor.Error.prototype;

	console.log(new Meteor.Error('error', 'reason', 'details'));
	console.log(new Message());
	ModuleC.prototype.Notifications = {

	}
}