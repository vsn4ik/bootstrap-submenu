'use strict';

$(function() {
	// Dropdown fix
	$('.dropdown > a[tabindex]').keydown(function(event) {
		// 13: Return

		if (event.keyCode == 13) {
			$(this).dropdown('toggle');
		}
	});

	// Предотвращаем закрытие при клике на неактивный элемент списка
	$('.dropdown-menu > .disabled, .dropdown-header').on('click.bs.dropdown.data-api', function(event) {
		event.stopPropagation();
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
