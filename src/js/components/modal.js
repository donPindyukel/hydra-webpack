// ==========================================================================
// Компонент модального окна
// ==========================================================================

class Modal {

    constructor(globalClass) {
        this.globalClass = el(globalClass);
    }

    /**
     * Показать модальное окно по названию класса или id
     * @param target
     */
    show(target) {
        this.hideAll();
        let actor = el(target);
        actor.addClass('show');
    }

    /**
     * Скрыть модальное окно по названию класса или id
     * @param target
     */
    hide(target) {
        let actor = el(target);
        actor.removeClass('show');
    }

    /**
     * Скрыть все модальные окна
     */
    hideAll() {
        this.globalClass.removeClass('show');
    }

}