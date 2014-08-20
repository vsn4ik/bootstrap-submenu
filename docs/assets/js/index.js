'use strict';

$(function() {
	$('.dropdown-submenu > a').submenupicker();

	$('#scroll_top').click(function() {
		// 'html' for Mozilla Firefox, 'body' for other browsers
		$('body, html').animate({
			scrollTop: 0
		}, 800);

		this.blur();
	});
});
