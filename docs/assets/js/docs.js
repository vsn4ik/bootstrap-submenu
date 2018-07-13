'use strict';

document.addEventListener('DOMContentLoaded', function() {
  $.ajax({
    url: 'https://api.github.com/repos/vsn4ik/bootstrap-submenu',
    success: function(data) {
      // XSS check
      if (typeof data.stargazers_count !== 'number') {
        return;
      }

      var html = '' +
        '<div class="input-group">' +
          '<div class="input-group-prepend"></div>' +
          '<div class="input-group-append">' +
            '<span class="input-group-text bg-white">' +
              data.stargazers_count +
              '&nbsp;' +
              '<span class="fas fa-star"></span>' +
            '</span>' +
          '</div>' +
        '</div>';

      $('#gh-view-link').wrap(html);
    }
  });

  window.onscroll = function() {
    document.querySelector('.js-scroll-top').hidden = window.pageYOffset < 100;
  };

  // NOTE: Dropdown fix
  $('a[tabindex][data-toggle="dropdown"]').on('keydown', function(event) {
    // 13: Return, 32: Spacebar

    if (![13, 32].includes(event.keyCode)) {
      return;
    }

    // NOTE: Off vertical scrolling
    event.preventDefault();

    $(this).dropdown('toggle');
  });

  // Для отмены закрытия при клике на неактивный элемент либо padding
  $('.dropdown-menu').on('click', function(event) {
    if (this === event.target) {
      event.stopPropagation();
    }
  });

  $('[data-submenu]').submenupicker();
});
