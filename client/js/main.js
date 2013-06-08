if (Meteor.isClient) {
	Meteor.startup(function () {

		//start APP
		WEBAPP._start();

		$('button.run1').click(function(){
			if($('.effect1').hasClass('flipped'))
				$('.effect1').removeClass('flipped');
			else
				$('.effect1').addClass('flipped');
		});
		$('button.run2').click(function(){
			if($('.effect2').hasClass('flipped2'))
				$('.effect2').removeClass('flipped2');
			else
				$('.effect2').addClass('flipped2');
		});
		$('button.run3').click(function(){
			if($('.effect3').hasClass('flipped3'))
				$('.effect3').removeClass('flipped3');
			else
				$('.effect3').addClass('flipped3');
		});
	});
}