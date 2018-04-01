(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  class DropdownSubmenu {
    constructor(element) {
      this.element = element.parentElement;
      this.menuElement = this.element.querySelector('.dropdown-menu');

      this.init();
    }

    init() {
      $(this.element).off('keydown.bs.dropdown.data-api');

      this.menuElement.addEventListener('keydown', this.itemKeydown.bind(this));

      const dropdownItemNodeList = this.menuElement.querySelectorAll('.dropdown-item');

      for (const element of dropdownItemNodeList) {
        element.addEventListener('keydown', this.handleKeydownDropdownItem.bind(this));
      }

      $(this.menuElement).on('keydown', '.dropdown-submenu > .dropdown-item', this.handleKeydownSubmenuDropdownItem.bind(this));
      $(this.menuElement).on('click', '.dropdown-submenu > .dropdown-item', this.handleClickSubmenuDropdownItem.bind(this));
      $(this.element).on('hidden.bs.dropdown', () => {
        this.close(this.menuElement);
      });
    }

    handleKeydownDropdownItem(event) {
      // 27: Esc
      if (event.keyCode !== 27) {
        return;
      }

      event.target.closest('.dropdown-menu').previousElementSibling.focus();
      event.target.closest('.dropdown-menu').classList.remove('show');
    }

    handleKeydownSubmenuDropdownItem(event) {
      // 32: Spacebar
      if (event.keyCode !== 32) {
        return;
      }

      // NOTE: Off vertical scrolling
      event.preventDefault();

      this.toggle(event.target);
    }

    handleClickSubmenuDropdownItem(event) {
      event.stopPropagation();

      this.toggle(event.target);
    }

    itemKeydown(event) {
      // 38: Arrow up, 40: Arrow down
      if (![38, 40].includes(event.keyCode)) {
        return;
      }

      // NOTE: Off vertical scrolling
      event.preventDefault();

      event.stopPropagation();

      const itemNodeList = this.element.querySelectorAll('.show > .dropdown-item:not(:disabled):not(.disabled), .show > .dropdown > .dropdown-item');

      let index = Array.from(itemNodeList).findIndex((element) => {
        return element === event.target;
      });

      if (event.keyCode === 38 && index !== 0) {
        index--;
      } else if (event.keyCode === 40 && index !== itemNodeList.length - 1) {
        index++;
      } else {
        return;
      }

      itemNodeList[index].focus();
    }

    toggle(element) {
      const dropdownElement = element.closest('.dropdown');
      const parentMenuElement = dropdownElement.closest('.dropdown-menu');
      const menuElement = dropdownElement.querySelector('.dropdown-menu');
      const isOpen = menuElement.classList.contains('show');

      this.close(parentMenuElement);

      menuElement.classList.toggle('show', !isOpen);
    }

    close(menuElement) {
      const menuNodeList = menuElement.querySelectorAll('.dropdown-menu.show');

      for (const element of menuNodeList) {
        element.classList.remove('show');
      }
    }
  }

  // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/
  $.fn.submenupicker = function(elements) {
    const $elements = this instanceof $ ? this : $(elements);

    return $elements.each(function() {
      let data = $.data(this, 'bs.submenu');

      if (!data) {
        data = new DropdownSubmenu(this);

        $.data(this, 'bs.submenu', data);
      }
    });
  };

  return DropdownSubmenu;
});
