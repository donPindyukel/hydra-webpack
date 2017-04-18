// ==========================================================================
// Компонент элемента
// ==========================================================================

class Element {

    constructor(actor) {
        this.name = null;
        this.actors = [];

        if (typeof actor === 'string') {
            this.name = actor;
            this.actors = document.querySelectorAll(actor);
        } else if (typeof actor === 'object' && actor.length > 0) {
            this.actors = actor;
        }

        return this;
    }

    /**
     * Добавить новый класс
     * @param name имя класса
     */
    addClass(name) {
        this.actors.forEach((th) => {
            th.classList.add(name);
        });
        return this;
    }

    /**
     * Удалить класс из списка классов
     * @param name имя класса
     */
    removeClass(name) {
        this.actors.forEach((th) => {
           th.classList.remove(name);
        });
        return this;
    }

    /**
     * Добавление класса после истечения времени
     * @param name имя класса
     * @param timeout тамаут
     */
    addClassTimeout(name, timeout = 1000) {
        this.actors.forEach((th) => {
            setTimeout(function() {
                th.classList.add(name);
            }, timeout);
        });
        return this;
    }

    /**
     * Удаление класса после истечения времени
     * @param name имя класса
     * @param timeout тамаут
     */
    removeClassTimeout(name, timeout = 1000) {
        this.actors.forEach((th) => {
            setTimeout(function() {
                th.classList.remove(name);
            }, timeout);
        });
        return this;
    }

    /**
     * Проверяет наличие класса у элемента
     * @param name имя класса
     * @returns {boolean}
     */
    hasClass(name) {
        this.actors.forEach((th) => {
            th.classList.forEach(function(cls) {
                if (cls === name)
                    return true;
            });
        });
        return false;
    }

    /**
     * Возвращает значение аттрибута по имени
     * @returns {string}
     */
    attr(name, val = null) {
        if (val !== null) {
            this.actors.forEach((th) => {
                th.setAttribute(name, val);
            });
        }

        this.actors.forEach((th) => {
            return th.getAttribute(name)
        });
    }

    /**
     * Получаем содержимое аттрибута DATA-*
     * @param name имя аттрибута
     * @returns {string}
     */
    data(name) {
        let result = null;
        this.actors.forEach((th) => {
            result = th.getAttribute("data-" + name);
        });
        return result;
    }

    /**
     * Проверяем наличие аттрибута DATA-*
     * @param name имя аттрибута
     * @returns {boolean}
     */
    hasData(name) {
        let result = false;
        this.actors.forEach((th) => {
            result = th.getAttribute("data-" + name) !== null;
        });
        return result;
    }

    /**
     * Поиск элементов внутри данного объекта
     * @param name
     * @param returnType указвает функцию через которую будет создаваться объект
     * @returns {Array}
     */
    child(name, returnType = 'elements') {
        if (this.name !== null)
            return el(this.name + " " + name, returnType);
        else {
            let elmns = null;
            this.actors.forEach((th) => {
                elmns = th.querySelectorAll(name);
            });
            return el(elmns, returnType);
        }
    }

    /**
     * Возвращаем длину элемента
     * @returns {number}
     */
    width() {
        let result = 0;
        this.actors.forEach((th) => {
            result = th.offsetWidth
        });
        return result;
    }

    /**
     * Возвращаем высоту элемента
     * @returns {number}
     */
    height() {
        let result = 0;
        this.actors.forEach((th) => {
            result = th.offsetHeight
        });
        return result;
    }

    /**
     * Возвращает родительский элемент
     * @param returnType
     * @returns {Array}
     */
    parent(returnType = 'element') {
        let elmns = [];
        this.actors.forEach((th) => {
            elmns.push(th.parentNode);
        });
        return el(elmns, returnType);
    }

    /**
     * Возвращает css параметр
     * @param name
     * @returns {string}
     */
    css(name) {
        let result = null;
        this.actors.forEach((th) => {
            result = window.getComputedStyle(th).getPropertyValue(name);
        });
        return result;
    }

    /**
     * Заменить содержимое жлемента
     * @param value на какое значение заменить
     */
    html(value = null) {
        if (value !== null) {
            this.actors.forEach((th) => {
                th.innerHTML = value
            });
        }
        let result = null;
        this.actors.forEach((th) => {
            result = th.innerHTML
        });
        return result;
    }

}
