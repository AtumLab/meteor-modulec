Posts = new Meteor.Collection("posts", {
	transform: function (document) {
		document.date = moment("/Date("+document.date+")/").fromNow();
		return document;
	}
});