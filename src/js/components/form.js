// ==========================================================================
// Компонент формы
// ==========================================================================

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
     * @param stopIsNotValidate - если не прошло валидацию данные не отправлять
     */
    eventSubmit(func, stopIsNotValidate = formStopIsNotValidate) {
        let form = this;
        this.actor.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!stopIsNotValidate)
                ajaxPost(form.attr('action'), form.serialize(), func);
            else {
                let error = 0;
                this.formFields.forEach(function (field) {
                    if (!field.validate())
                        error++;
                });
                if (error === 0)
                    ajaxPost(form.attr('action'), form.serialize(), func);
            }
            return false;
        });
    }

}