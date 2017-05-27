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
 * @param url
 * @param params
 * @param func
 */
function ajaxPost(url, params, func) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.onload = function () {
        func(httpRequest.responseText, httpRequest.status);
    };
    httpRequest.send(encodeURI(params));
}

// ==========================================================================
// Расширения для JQuery
// ==========================================================================

(function( $ ) {

    /**
     * Добавить класс после истечения времени
     * @param className
     * @param timeout
     */
    $.fn.addClassTimeout = function(className, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.addClass(className);
        }, timeout);
    };

    /**
     * Удалить класс после истечения времени
     * @param className
     * @param timeout
     */
    $.fn.removeClassTimeout = function(className, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.removeClass(className);
        }, timeout);
    };

})(jQuery);