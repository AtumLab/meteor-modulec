// Khoi dong cac thanh phan du an
	WEBAPP.Router.implement({
		isHash: true,
		routes: {
			"": "index",
			"product/:attribute/:value": "showProduct"
		},
		index: function(){
			console.log('index');
		},
		showProduct: function(attr, value){
			console.log(attr);
			console.log(value);
		}
	}).addFilters({
		'checkLoggedIn': function(page) {
			return false;
		}
	});