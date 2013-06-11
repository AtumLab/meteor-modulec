	Template.router_page.events({
		'click .to': function(e, t){
			e.preventDefault();
			WEBAPP.Router.to('product/attribute/value');
		},
		'click .change-ui': function(e, t){
			e.preventDefault();
			$(t.find('.ui')).append('<h3>ADD</h3>');
		},
		'click .forward': function(e, t){
			e.preventDefault();
			WEBAPP.Router.forward();
		},
		'click .back': function(e, t){
			e.preventDefault();
			WEBAPP.Router.back();
		}		
	});