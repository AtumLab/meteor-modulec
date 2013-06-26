// description
Package.describe({
	summary: "Module C"
});

Package.on_use(function (api) {
	//console.log(api);
	// depend packages
	api.use(["underscore"], ["client", "server"]);

	// both
	api.add_files(["both/boot.js", "both/core.js", "both/module.js"], ["client", "server"]);
	
	// client
	api.add_files(["client/boot.js", "client/layout.js", "client/router.js", "client/notifications.js", "client/modulec.css"], "client");

	// server
	api.add_files(["server/boot.js"], "server");
});