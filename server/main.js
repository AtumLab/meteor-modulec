Meteor.startup(function () {
	//startup
	console.log('main.js startup');
	var postModule = WEBAPP.find('Post');
	if(postModule.getPage() == 0){
		console.log('- add record post.');
		var post = postModule.validateData('PostModel',{
			title: "Project: website design",				
			content: "Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Suspendisse augue tellus, sollicitudin ut tristique, nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo.",
			description: "Company: Klarkson promotions",
			date: Date.now()
		});
		postModule.create(post, function(){});
		post = postModule.validateData('PostModel',{
			title: "Project: share fun",				
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, tellus eu ultrices rutrum, nulla urna mollis ante, at dignissim libero urna sit amet neque. Duis luctus luctus massa commodo euismod. Integer id imperdiet quam, nec pharetra odio. Maecenas dignissim arcu sed odio volutpat consectetur. In vitae purus at risus porta elementum non quis urna. Fusce viverra facilisis massa, nec condimentum augue suscipit nec. Etiam viverra libero at odio sodales sagittis. Pellentesque fringilla magna at rhoncus interdum. Cras ut mollis leo. Mauris aliquam, purus vitae vestibulum gravida, arcu odio iaculis risus, ac porta mi nunc vitae quam.Aliquam eleifend augue lacus, vitae rutrum erat consequat et. Pellentesque ut leo sapien. Maecenas et velit aliquet, venenatis nunc ut, cursus dolor. Cras vel leo eleifend, ultrices mi eu, luctus enim. Integer mattis suscipit ligula, in laoreet erat pulvinar id. Ut dapibus ipsum vitae justo imperdiet, id aliquam enim mattis. Donec a dapibus dui, et elementum erat. Cras at eros libero. Vivamus lacinia purus eu massa fermentum, nec faucibus nisl iaculis. Donec vestibulum elit id neque auctor vulputate in vel est.",
			description: "Company: Klarkson promotions",
			date: Date.now()
		});
		postModule.create(post, function(){});
		post = postModule.validateData('PostModel',{
			title: "Project: manager site",				
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, tellus eu ultrices rutrum, nulla urna mollis ante, at dignissim libero urna sit amet neque. Duis luctus luctus massa commodo euismod. Integer id imperdiet quam, nec pharetra odio. Maecenas dignissim arcu sed odio volutpat consectetur. In vitae purus at risus porta elementum non quis urna. Fusce viverra facilisis massa, nec condimentum augue suscipit nec. Etiam viverra libero at odio sodales sagittis. Pellentesque fringilla magna at rhoncus interdum. Cras ut mollis leo. Mauris aliquam, purus vitae vestibulum gravida, arcu odio iaculis risus, ac porta mi nunc vitae quam.Aliquam eleifend augue lacus, vitae rutrum erat consequat et. Pellentesque ut leo sapien. Maecenas et velit aliquet, venenatis nunc ut, cursus dolor. Cras vel leo eleifend, ultrices mi eu, luctus enim. Integer mattis suscipit ligula, in laoreet erat pulvinar id. Ut dapibus ipsum vitae justo imperdiet, id aliquam enim mattis. Donec a dapibus dui, et elementum erat. Cras at eros libero. Vivamus lacinia purus eu massa fermentum, nec faucibus nisl iaculis. Donec vestibulum elit id neque auctor vulputate in vel est.Curabitur porta volutpat dapibus. Morbi eget sapien vel turpis accumsan laoreet. Sed eros sapien, suscipit eget nulla id, consequat ultrices ligula. Quisque varius, dolor vitae euismod commodo, augue sem pulvinar lectus, vel venenatis sapien nisl nec augue. Quisque sodales pharetra lectus, accumsan suscipit nisl tristique eu. Curabitur dui massa, fringilla ac porttitor non, sodales at massa. Suspendisse nec rhoncus risus. Suspendisse tincidunt consectetur ligula, nec sollicitudin libero suscipit sed. In hac habitasse platea dictumst. Maecenas molestie lacinia lorem in vehicula.Mauris ante mauris, sodales nec magna vitae, eleifend condimentum elit. Praesent dapibus adipiscing diam eget dapibus. ",
			date: Date.now()
		});
		postModule.create(post, function(){});
		post = postModule.validateData('PostModel',{
			title: "Project: classic 80's",				
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, tellus eu ultrices rutrum, nulla urna mollis ante, at dignissim libero urna sit amet neque. Duis luctus luctus massa commodo euismod. Integer id imperdiet quam, nec pharetra odio. Maecenas dignissim arcu sed odio volutpat consectetur. In vitae purus at risus porta elementum non quis urna. Fusce viverra facilisis massa, nec condimentum augue suscipit nec. Etiam viverra libero at odio sodales sagittis. Pellentesque fringilla magna at rhoncus interdum. Cras ut mollis leo. Mauris aliquam, purus vitae vestibulum gravida, arcu odio iaculis risus, ac porta mi nunc vitae quam.Aliquam eleifend augue lacus, vitae rutrum erat consequat et. Pellentesque ut leo sapien. Maecenas et velit aliquet, venenatis nunc ut, cursus dolor. Cras vel leo eleifend, ultrices mi eu, luctus enim. Integer mattis suscipit ligula, in laoreet erat pulvinar id. Ut dapibus ipsum vitae justo imperdiet, id aliquam enim mattis. Donec a dapibus dui, et elementum erat. Cras at eros libero. Vivamus lacinia purus eu massa fermentum, nec faucibus nisl iaculis. Donec vestibulum elit id neque auctor vulputate in vel est.Curabitur porta volutpat dapibus. Morbi eget sapien vel turpis accumsan laoreet. Sed eros sapien, suscipit eget nulla id, consequat ultrices ligula. Quisque varius, dolor vitae euismod commodo, augue sem pulvinar lectus, vel venenatis sapien nisl nec augue. Quisque sodales pharetra lectus, accumsan suscipit nisl tristique eu. Curabitur dui massa, fringilla ac porttitor non, sodales at massa. Suspendisse nec rhoncus risus. Suspendisse tincidunt consectetur ligula, nec sollicitudin libero suscipit sed. In hac habitasse platea dictumst. Maecenas molestie lacinia lorem in vehicula.Mauris ante mauris, sodales nec magna vitae, eleifend condimentum elit. Praesent dapibus adipiscing diam eget dapibus. Nam dui massa, sodales id consectetur eget, commodo in leo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque vulputate tellus nec libero tincidunt, mattis ornare arcu molestie. Cras eu lectus scelerisque, auctor ligula ac, elementum ligula. Donec a quam id ligula pharetra pulvinar quis iaculis tellus. Aenean fermentum felis metus, in viverra metus semper et. Ut suscipit sed mi ac aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Donec consectetur, mi id aliquet ornare, dolor mauris rutrum erat, non consectetur nibh libero ut ipsum. Donec non tellus a nunc consequat vulputate. Vivamus tortor lacus, dapibus vel iaculis id, vehicula nec est. Morbi massa tortor, luctus non enim ut, cursus iaculis velit. Fusce sagittis fermentum orci at rutrum. Aliquam enim tortor, molestie eu ipsum a, interdum fermentum ipsum. Sed ac nunc sit amet purus interdum sollicitudin sit amet sit amet est. Nulla non nisl tortor. Praesent porta, turpis sed scelerisque elementum, augue mi convallis urna, nec porttitor libero nulla ut lacus.",
			date: Date.now()
		});
		postModule.create(post, function(){});
	}
	var accountModule = WEBAPP.find('Account');
	if(Meteor.users.find().count() === 0) {
    	console.log('Adding in users');
    	var account = accountModule.validateData('AccountModel',{
			username: 'admin',
			password: 'admin',				
			emails: 'particle4dev@gmail.com',
			profile :{					
				avatar: '',
				introduce: '',
				contact: ''
			}
		});
		// 1.Complete
		accountModule.create(account);
		// 2. Error
		//accountModule.create(account);
	}
	//start APP
	WEBAPP._start();	
});