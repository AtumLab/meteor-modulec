// Khoi dong cac thanh phan du an
	WEBAPP.Router.implement({
		isHash: true,
		routes: {
			"": "index",
			":attribute/:value": "showProduct"
		},
		index: function(){
			console.log('index');
		},
		showProduct: function(attr, value){
			console.log(attr);
			console.log(value);
		}
	}).addFilters({
		'checkLoggedIn': function() {
			var result = (Math.random() * 10 ) << 0;
			result = (result<5) ? true : false;
			console.log(result);
			return result;
		}
	}).setFilter('checkLoggedIn', {only: 'index', except: 'showProduct'})//.route(, function(){
		
	//});