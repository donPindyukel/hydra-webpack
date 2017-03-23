// ==========================================================================
// Компонент элемента
// ==========================================================================

/**
 * Точка входа в элемент
 * @param actor
 * @returns {Array}
 */
function el(actor) {
    let elements = [];

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new Element(selectElements[i]));
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        let selectElements = actor;
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new Element(selectElements[i]));
    }

    return elements;
}

class Element {

    constructor(actor) {
        this.name = null;
        this.actor = null;

        if (typeof actor === 'string') {
            this.name = actor;
            this.actor = document.querySelector(actor);
        }

        else if (typeof actor === 'object') {
            this.actor = actor;
        }

        return this;
    }

    //
    // Работа с классами
    //

    /**
     * Добавить новый класс
     * @param name имя класса
     */
    addClass(name) {
        this.actor.classList.add(name);
        return this;
    }

    /**
     * Удалить класс из списка классов
     * @param name имя класса
     */
    removeClass(name) {
        this.actor.classList.remove(name);
        return this;
    }

    /**
     * Добавление класса после истечения времени
     * @param name имя класса
     * @param timeout тамаут
     */
    addClassTimeout(name, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.addClass(name);
        }, timeout);
        return this;
    }

    /**
     * Удаление класса после истечения времени
     * @param name имя класса
     * @param timeout тамаут
     */
    removeClassTimeout(name, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.removeClass(name);
        }, timeout);
        return this;
    }

    /**
     * Проверяет наличие класса у элемента
     * @param name имя класса
     * @returns {boolean}
     */
    hasClass(name) {
        for (let i = 0; i < e.actor.classList.length; i++) {
            if (e.actor.classList[i] === name)
                return true;
        }
        return false;
    }

    //
    // Работа с аттрибутами
    //

    /**
     * Возвращает значение аттрибута по имени
     * @returns {string}
     */
    attr(name, val = null) {
        if (val !== null)
            this.actor.setAttribute(name, val);
        return this.actor.getAttribute(name);
    }

    /**
     * Получаем содержимое аттрибута DATA-*
     * @param name имя аттрибута
     * @returns {string}
     */
    data(name) {
        return this.actor.getAttribute("data-" + name);
    }

    /**
     * Проверяем наличие аттрибута DATA-*
     * @param name имя аттрибута
     * @returns {boolean}
     */
    hasData(name) {
        return this.data(name) !== null;
    }

    //
    // Работа с событиями
    //

    /**
     * Событие клика по элементу
     * @param func колбэк
     */
    eventClick(func) {
        this.actor.addEventListener('click', () => {
            func(this);
        });
        return this;
    }

    //
    // Вспомогательный функционал
    //

    /**
     * Поиск элементов внутри данного объекта
     * @param name
     * @param func указвает функцию через которую будет создаваться объект
     * @returns {Array}
     */
    find(name, func = el) {
        if (this.name !== null)
            return func(this.name + " " + name);
        else
            return func(this.actor.querySelectorAll(name));
    }

    /**
     * Заменить содержимое жлемента
     * @param value на какое значение заменить
     */
    html(value) {
        this.actor.innerHTML = value;
        return this;
    }

}