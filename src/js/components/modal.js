// ==========================================================================
// Компонент модального окна
// ==========================================================================

/**
 * Точка входа в модальное окно
 * @param actor
 * @returns {ElModal}
 */
function el_modal(actor) {
    let elm = new ElModal(actor);
    elm.initAll();
    return elm;
}


class ElModal extends Element {

    constructor(actor) {
        super(actor);
    }

    /**
     * Показать модальное окно
     * @param animatedClass класс анимации
     * @param animateDeleteTimeout через сколько удалить класс анимации
     */
    show(animatedClass = null, animateDeleteTimeout = 1000) {
        if (animatedClass != null) {
            this.addClass(animatedClass);
            this.removeClassTimeout(animatedClass, false, animateDeleteTimeout);
        }
        this.addClass('show');
    }

    /**
     * Скрыть модальное окно
     * @param animatedClass класс анимации
     * @param animateDeleteTimeout через сколько удалить класс анимации
     */
    hide(animatedClass = null, animateDeleteTimeout = 1000) {
        if (animatedClass != null) {
            this.addClass(animatedClass);
            this.removeClassTimeout(animatedClass, false, animateDeleteTimeout);

            let th = this;
            setTimeout(function () {
                th.removeClass('show');
            }, animateDeleteTimeout)
        }
        else
            this.removeClass('show');
    }

}