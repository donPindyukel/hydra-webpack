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
 * Отправка GET запроса ajax
 * @param url
 * @param func
 */
function ajaxGet(url, func) {
	let httpRequest = new XMLHttpRequest();

	httpRequest.open('GET', url);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.onload = function () {
		func(httpRequest.responseText, httpRequest.status);
	};
	httpRequest.send();
}

/**
 * Отправка POST запроса ajax
 * @param form Для возвращения объекта формы в callback
 * @param url
 * @param params
 * @param func
 */
function ajaxPost(form, url, params, func) {
	let httpRequest = new XMLHttpRequest();

	httpRequest.open('POST', url);
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	httpRequest.onload = function () {
		func(form, httpRequest.responseText, httpRequest.status);
	};
	httpRequest.send(encodeURI(params));
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
		let th = this;

		setTimeout(() => {
			th.addClass(className);
		}, timeout);
	};

	/**
     * Удалить класс после истечения времени
     * @param className
     * @param timeout
     */
	$.fn.removeClassTimeout = function (className, timeout = 1000) {
		let th = this;

		setTimeout(() => {
			th.removeClass(className);
		}, timeout);
	};
})(jQuery);
