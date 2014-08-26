'use strict';

$(function() {
	$('.dropdown > a[tabindex]').keydown(function() {
		// 13: Return

		if (event.keyCode == 13) {
			$(this).dropdown('toggle');
		}
	});

	$('.dropdown-submenu > a').submenupicker();

	$('#scroll_top').click(function() {
		// 'html' for Mozilla Firefox, 'body' for other browsers
		$('body, html').animate({
			scrollTop: 0
		}, 800);

		this.blur();
	});
});
