// ==========================================================================
// Компонент модального окна
// ==========================================================================

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