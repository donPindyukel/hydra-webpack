// ==========================================================================
// Вспомогательные функции
// ==========================================================================

/**
 * Вывод в консоль сообщения
 * @param val
 */
function log(val) {
  console.log(val);
}

/**
 * Получить cookie по ключу
 * @param name
 * @returns {*}
 */
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Задать cookie
 * @param name
 * @param value
 * @param options path=/; expires="
 */
function setCookie(name, value, options) {
  options = options || {
  };
  let expires = options.expires;

  if (typeof expires === 'number' && expires) {
    let d = new Date();

    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;

  for (let propName in options) {
    updatedCookie += `; ${propName}`;
    let propValue = options[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

/**
 * Удалить cookie
 * @param name
 */
function deleteCookie(name) {
  setCookie(name, '', {
    expires: -1,
  });
}

// ==========================================================================
// Расширения для JQuery
// ==========================================================================

(function ($) {
  /**
     * Добавить класс после истечения времени
     * @param className
     * @param timeout
     */
  $.fn.addClassTimeout = function (className, timeout = 1000) {
    let $th = $(this);

    setTimeout(() => {
      $th.addClass(className);
    }, timeout);

    return $th;
  };

  /**
     * Удалить класс после истечения времени
     * @param className
     * @param timeout
     */
  $.fn.removeClassTimeout = function (className, timeout = 1000) {
    let $th = $(this);

    setTimeout(() => {
      $th.removeClass(className);
    }, timeout);

    return $th;
  };
})(jQuery);
