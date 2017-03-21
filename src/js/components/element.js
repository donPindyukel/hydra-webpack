// ==========================================================================
// Компонент элемента
// ==========================================================================

/**
 * Точка входа в элемент
 * @param actor
 * @returns {Element}
 */
function el(actor) {
    return new Element(actor);
}


class Element {

    constructor(actor) {
        this.countElements = 0;
        if (document.querySelectorAll(actor).length > 1) {
            this.countElements = document.querySelectorAll(actor).length;
            this.actor = document.querySelectorAll(actor);
        }
        else {
            this.countElements = 1;
            this.actor = document.querySelector(actor);
        }
    }

    /**
     * Добавить новый класс
     * @param name
     */
    addClass(name) {
        if (this.countElements == 1) {
            this.actor.classList.add(name);
        }
        else {
            for (let i = 0; i < this.actor.length; i++) {
                this.actor[i].classList.add(name);
            }
        }
    }

    /**
     * Удалить класс из списка классов
     * @param name
     */
    removeClass(name) {
        if (this.countElements == 1) {
            this.actor.classList.remove(name);
        }
        else {
            for (let i = 0; i < this.actor.length; i++) {
                this.actor[i].classList.remove(name);
            }
        }
    }

    /**
     * Проверяет наличие класса в элементах
     * @param name
     * @returns {boolean}
     */
    hasClass(name) {
        if (this.countElements == 1) {
            for (let i = 0; i < this.actor.classList.length; i++) {
                if (this.actor.classList[i] == name)
                    return true;
            }
        }
        else {
            for (let i = 0; i < this.actor.length; i++) {
                for (let c = 0; c < this.actor[i].classList.length; c++) {
                    if (this.actor[i].classList[c] == name)
                        return true;
                }
            }
        }
        return false;
    }

    /**
     * Событие клика по элементу
     * @param func
     */
    clickEvent(func) {
        if (this.countElements == 1) {
            this.actor.onclick = () => {
                func();
            }
        }
        else {
            for (let i = 0; i < this.actor.length; i++) {
                this.actor[i].onclick = () => {
                    func();
                }
            }
        }
    }

}