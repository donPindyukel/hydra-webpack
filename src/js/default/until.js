// ==========================================================================
// Вспомогательные функции
// ==========================================================================

/**
 * Точка входа в элемент
 * @param actor
 * @param component
 * @returns {Array}
 */
function el(actor, component = 'element') {
    // Задаем компонент, который будет создаваться по стандарту
    let NameClass = Element;

    // Компонент кнопки
    if (component === 'button')
        NameClass = ElButton;

    // Компонент текстового поля
    else if (component === 'field')
        NameClass = ElField;

    // Компонент формы
    else if (component === 'form')
        NameClass = ElForm;

    // Компонент модального окна
    else if (component === 'modal')
        NameClass = ElModal;

    // Компонент слайдера
    else if (component === 'slider')
        NameClass = ElSlider;

    // Компонент ленивой загрузки
    else if (component === 'lazy')
        NameClass = ElLazy;

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        return new NameClass(selectElements);
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        return new NameClass(actor)
    }

    else if (typeof actor === 'object' && actor.length === undefined) {
        return new NameClass(actor);
    }

    return null;
}

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
