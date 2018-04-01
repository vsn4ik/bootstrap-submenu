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

  /**
   * document.documentElement: 'html', for Mozilla Firefox
   * document.body: 'body', for other browsers
   */
  var containers = [
    document.body,
    document.documentElement
  ];

  var scrollButtonNode = document.querySelector('#scroll-top');

  function updateScrollButtonVisibility() {
    var scrollTop = containers.reduce(function(result, element) {
      return result + element.scrollTop;
    }, 0);

    scrollButtonNode.classList.toggle('hidden', scrollTop < 100);
  }

  scrollButtonNode.addEventListener('click', function() {
    window.onscroll = null;

    scrollButtonNode.classList.add('hidden');

    // 'html' for Mozilla Firefox, 'body' for other browsers
    $(containers).animate({
      scrollTop: 0
    }, 500, $.proxy(function() {
      window.onscroll = updateScrollButtonVisibility;
    }, this));
  });

  window.onscroll = updateScrollButtonVisibility;

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

  updateScrollButtonVisibility();
});
