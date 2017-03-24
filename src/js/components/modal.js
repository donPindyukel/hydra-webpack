// ==========================================================================
// Компонент модального окна
// ==========================================================================

/**
 * Точка входа в модальное окно
 * @param actor
 * @returns {Array}
 */
function el_modal(actor) {
    let elements = [];

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElModal(selectElements[i]));
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        let selectElements = actor;
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElModal(selectElements[i]));
    }

    return elements;
}

class ElModal extends Element {

    constructor(actor) {
        super(actor);
        return this;
    }

    /**
     * Показать модальное окно
     * @param animatedClass класс анимации
     * @param animateDeleteTimeout через сколько удалить класс анимации
     */
    show(animatedClass = modalAnimateClassShow,
         animateDeleteTimeout = modalAnimateDeleteTimeout) {
        if (animatedClass !== null) {
            this.addClass(animatedClass);
            this.removeClassTimeout(animatedClass, animateDeleteTimeout);
        }
        this.addClass('show');
    }

    /**
     * Скрыть модальное окно
     * @param animatedClass класс анимации
     * @param animateDeleteTimeout через сколько удалить класс анимации
     */
    hide(animatedClass = modalAnimateClassHide,
         animateDeleteTimeout = modalAnimateDeleteTimeout) {
        if (animatedClass !== null) {
            this.addClass(animatedClass);
            this.removeClassTimeout(animatedClass, animateDeleteTimeout);

            let th = this;
            setTimeout(function () {
                th.removeClass('show');
            }, animateDeleteTimeout)
        }
        else
            this.removeClass('show');
    }

}