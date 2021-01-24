'use strict';

var exec = function() {
  fetch('https://api.github.com/repos/vsn4ik/bootstrap-submenu')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // NOTE: XSS check
      if (typeof response.stargazers_count !== 'number') {
        return;
      }

      var html = '' +
        '<div class="input-group">' +
          '<div class="input-group-prepend"></div>' +
          '<div class="input-group-append">' +
            '<span class="input-group-text bg-white d-flex align-items-center">' +
              '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">' +
                '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>' +
              '</svg>' +
              response.stargazers_count +
            '</span>' +
          '</div>' +
        '</div>';

      $('#gh-view-link').wrap(html);
    });

  function handleScroll() {
    document.querySelector('.js-scroll-top').hidden = window.pageYOffset < 100;
  }

  window.onscroll = handleScroll;

  handleScroll();

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
  window.hljs.initHighlightingOnLoad();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', exec);
} else {
  exec();
}
