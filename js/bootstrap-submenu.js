'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-submenu requires jQuery');
}

(function($) {
	function Submenupicker(element) {
		this.$element = $(element);
		this.$menu = this.$element.parent();
		this.$submenus = this.$menu.parent().find('.dropdown-submenu').not(this.$menu);

		this.init();
	}

	Submenupicker.prototype = {
		init: function() {
			this.$element.on('click.bs.dropdown', this.click.bind(this));
			this.$element.keydown(this.keydown.bind(this));
		},
		click: function(event) {
			event.stopPropagation();

			this.toggle();
		},
		toggle: function() {
			this.$menu.toggleClass('open');
			this.$submenus.removeClass('open');
		},
		keydown: function(event) {
			// 13: Return, 32: Spacebar
			// 38: Arrow left, 40: Arrow right

			// Off vertical scrolling
			if (/^(32|38|40)$/.test(event.keyCode)) {
				event.preventDefault();
			}

			if (/^(38|40)$/.test(event.keyCode)) {
				event.stopPropagation();
			}

			if (/^(13|32)$/.test(event.keyCode)) {
				this.toggle();
			}
		}
	};

	$.fn.submenupicker = function() {
		return this.each(function() {
			var data = $.data(this, 'bs.submenu');

			if (!data) {
				new Submenupicker(this);

				$.data(this, 'bs.submenu', true);
			}
		});
	};
}(jQuery));
