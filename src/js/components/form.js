// ==========================================================================
// Компонент формы
// ==========================================================================

/**
 * Точка входа в форму
 * @param actor
 * @returns {ElForm}
 */
function el_form(actor) {
    let elm = new ElForm(actor);
    elm.initAll();
    return elm;
}


class ElForm extends Element {

    constructor(actor) {
        super(actor);
    }

    /**
     * Возвращает значение value у текстового поля
     * @param value
     */
    val(value = null) {
        if (value != null)
            this.actor.value = value;
        return this.actor.value;
    }

    /**
     * Проверяем checked ли checkbox или radio
     * @param value
     * @returns {Element.checked}
     */
    checked(value = null) {
        if (value != null)
            this.actor.checked = value;
        return this.actor.checked;
    }

    /**
     * Событие изменения элемента
     * @param func колбэк
     * @param all применять ко всем
     */
    eventChange(func, all = false) {
        if (!all) {
            this.actor.onchange = () => {
                func(this);
            }
        }
        else {
            this.each(function (e) {
                e.actor.onchange = () => {
                    func(e);
                }
            });
        }
    }

}