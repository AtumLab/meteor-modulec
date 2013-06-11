if (Meteor.isClient) {
	Meteor.startup(function () {
		
		//start APP
		WEBAPP._start();

	});
}