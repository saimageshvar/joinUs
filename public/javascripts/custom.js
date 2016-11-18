function scrollToDiv(divClassName)
{
	$("html, body").delay(2000).animate({scrollTop: $('.'+ divClassName).offset().top }, 2000);
}	

window.onbeforeunload = function () {
	window.scrollTo(0,0);
	
}	

jQuery(document).ready(function($) {
	$('.counter').counterUp({
		delay: 50,
		time: 3000
	});
});