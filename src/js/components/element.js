// ==========================================================================
// Компонент элемента
// ==========================================================================

class Element {

    constructor(actor) {
        this.name = null;
        this.actor = null;

        if (typeof actor === 'string') {
            this.name = actor;
            this.actor = document.querySelector(actor);
        } else if (typeof actor === 'object') {
            this.actor = actor;
        }

        return this;
    }

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
        setTimeout(function() {
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
        setTimeout(function() {
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
        el.actor.classList.forEach(function(th) {
            if (th === name)
                return true;
        });
        return false;
    }

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

    /**
     * Поиск элементов внутри данного объекта
     * @param name
     * @param returnType указвает функцию через которую будет создаваться объект
     * @returns {Array}
     */
    find(name, returnType = 'elements') {
        if (this.name !== null)
            return el(this.name + " " + name, returnType);
        else
            return el(this.actor.querySelectorAll(name), returnType);
    }

    /**
     * Возвращаем длину элемента
     * @returns {number}
     */
    width() {
        return this.actor.offsetWidth;
    }

    /**
     * Возвращаем высоту элемента
     * @returns {number}
     */
    height() {
        return this.actor.offsetHeight;
    }

    /**
     * Возвращает родительский элемент
     * @param type
     * @returns {Array}
     */
    parent(type = 'element') {
        return el(this.actor.parentNode, type);
    }

    /**
     * Возвращает css параметр
     * @param name
     * @returns {string}
     */
    css(name) {
        let style = window.getComputedStyle(this.actor);
        return style.getPropertyValue(name);
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
