// ==========================================================================
// Компонент элемента
// ==========================================================================

/**
 * Точка входа в элемент
 * @param actor
 * @returns {Element}
 */
function el(actor) {
    let elm = new Element(actor);
    elm.initAll();
    return elm;
}


class Element {

    constructor(actor) {
        this.actor = null;
        this.all = [];

        if (typeof actor == 'object')
            this.actor = actor;
        else {
            this.name = actor;
            this.actor = document.querySelector(actor);
        }

        return this;
    }

    initAll() {
        let allList = document.querySelectorAll(this.name);
        for (let i = 0; i < allList.length; i++) {
            let elm = new Element(allList[i]);
            elm.name = this.name;
            this.all.push(elm);
        }
    }

    //
    // Работа с классами
    //

    /**
     * Добавить новый класс
     * @param name имя класса
     * @param all применять ко всем
     */
    addClass(name, all = false) {
        if (!all) {
            this.actor.classList.add(name);
        }
        else {
            this.each(function (e) {
                e.actor.classList.add(name);
            });
        }
    }

    /**
     * Удалить класс из списка классов
     * @param name имя класса
     * @param all применять ко всем
     */
    removeClass(name, all = false) {
        if (!all) {
            this.actor.classList.remove(name);
        }
        else {
            this.each(function (e) {
                e.actor.classList.remove(name);
            });
        }
    }

    /**
     * Добавление класса после истечения времени
     * @param name имя класса
     * @param all применять ко всем
     * @param timeout тамаут
     */
    addClassTimeout(name, all = false, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.addClass(name, all);
        }, timeout);
    }

    /**
     * Удаление класса после истечения времени
     * @param name имя класса
     * @param all применять ко всем
     * @param timeout тамаут
     */
    removeClassTimeout(name, all = false, timeout = 1000) {
        let th = this;
        setTimeout(function () {
            th.removeClass(name, all);
        }, timeout);
    }

    /**
     * Проверяет наличие класса у элемента
     * @param name имя класса
     * @returns {boolean}
     */
    hasClass(name) {
        for (let i = 0; i < e.actor.classList.length; i++) {
            if (e.actor.classList[i] == name)
                return true;
        }
        return false;
    }

    //
    // Работа с аттрибутами
    //

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
        return this.data(name) != null;
    }

    //
    // Работа с событиями
    //

    /**
     * Событие клика по элементу
     * @param func колбэк
     * @param all применять ко всем
     */
    eventClick(func, all = false) {
        if (!all) {
            this.actor.onclick = () => {
                func(this);
            }
        }
        else {
            this.each(function (e) {
                e.actor.onclick = () => {
                    func(e);
                }
            });
        }
    }

    //
    // Вспомогательный функционал
    //

    /**
     * Заменить содержимое жлемента
     * @param value на какое значение заменить
     * @param all применять ли ко всем
     */
    html(value, all = false) {
        if (!all) {
            this.actor.innerHTML = value;
        }
        else {
            this.each(function (th) {
                th.actor.innerHTML = value;
            })
        }
    }

    /**
     * Облегченный цикл для работы с элементами
     * @param func колбэк
     */
    each(func) {
        for (let i = 0; i < this.all.length; i++) {
            func(this.all[i]);
        }
    }

}