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
     * @param name
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
     * @param name
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
     * Проверяет наличие класса у элемента
     * @param name
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
     * @param name
     * @returns {string}
     */
    data(name) {
        return this.actor.getAttribute("data-" + name);
    }

    /**
     * Проверяем наличие аттрибута DATA-*
     * @param name
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
     * @param func
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
     * Облегченный цикл для работы с элементами
     * @param func
     */
    each(func) {
        for (let i = 0; i < this.all.length; i++) {
            func(this.all[i]);
        }
    }

}