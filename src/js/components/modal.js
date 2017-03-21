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
     */
    show() {
        this.addClass('show');
    }

    /**
     * Скрыть модальное окно
     */
    hide() {
        this.removeClass('show');
    }

}