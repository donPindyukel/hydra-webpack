// ==========================================================================
// Компонент формы
// ==========================================================================

/**
 * Точка входа в форму
 * @param actor
 * @returns {Array}
 */
function el_form(actor) {
    let elements = [];

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElForm(selectElements[i]));
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        let selectElements = actor;
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElForm(selectElements[i]));
    }

    return elements;
}

class ElForm extends Element {

    constructor(actor) {
        super(actor);
        this.formFields = this.loadFields();
        return this;
    }

    /**
     * Получаем список всех полей в форме
     * @returns {Array}
     */
    loadFields() {
        let fieldsList = [];
        // Записываем список всех инпутов в форме
        each(this.find('input', el_field), function (th) {
            fieldsList.push(th);
        });
        // Записываем список всех селектов в форме
        each(this.find('select', el_field), function (th) {
            fieldsList.push(th);
        });
        return fieldsList;
    }

    /**
     * Формируем все данные с полей в форме для отправки по ajax
     * @returns {string}
     */
    serialize() {
        let data = '';
        let i = 1;
        let countFields = this.formFields.length;
        each(this.formFields, function (field) {
            if (field.attr('type') !== "submit") {
                data += field.attr('name') + "=" + field.val();
                if (i < countFields)
                    data += "&";
            }
            i++;
        });
        return data;
    }

    /**
     * Событие отправки данных с формы
     * @param func - колбэк функция
     */
    eventSubmit(func) {
        let form = this;
        this.actor.addEventListener('submit', (e) => {
            e.preventDefault();
            ajaxPost(form.attr('action'), form.serialize(), func);
            return false;
        });
    }

}