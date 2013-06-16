	Template.router_page.events({
		'click .run': function(e, t){
			e.preventDefault();
			WEBAPP.Router.to('attribute/value');	
		}		
	});