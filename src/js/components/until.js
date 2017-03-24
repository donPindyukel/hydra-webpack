// ==========================================================================
// Компонент вспомогательный функций
// ==========================================================================

/**
 * Вывод в консоль сообщения
 * @param val
 */
function log(val) {
    console.log(val);
}

/**
 * Альтернативный цикл для работы с элементами
 * @param elements
 * @param func колбэк
 */
function each(elements, func) {
    for (let i = 0; i < elements.length; i++) {
        func(elements[i]);
    }
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