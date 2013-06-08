Meteor.startup(function () {
	//startup
	console.log('main.js startup');
	var postModule = WEBAPP.find('Post');
	if(postModule.getPage() == 0){
		console.log('- add record post.');
		var post1 = postModule.validateData('PostModel',{
			title: "Project: website design",				
			content: "Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Suspendisse augue tellus, sollicitudin ut tristique, nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo.",
			description: "Company: Klarkson promotions",
			date: Date.now()
		});
		postModule.create(post1, function(){});
		postModule.create(post1, function(){});
		postModule.create(post1, function(){});
		postModule.create(post1, function(){});
	}
	
	//start APP
	WEBAPP._start();	
});