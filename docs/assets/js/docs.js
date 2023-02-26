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

      document.querySelector('.js-stargazers-count').style.setProperty('--stargazers', response.stargazers_count);
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
  window.hljs.highlightAll();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', exec);
} else {
  exec();
}
