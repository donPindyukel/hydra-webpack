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

        let inputs = this.child('input', 'field');
        let selects = this.child('select', 'field');

        // Записываем список всех инпутов в форме
        if (inputs !== null && inputs.actors !== null) {
            inputs.actors.forEach((th) => {
                if (th.getAttribute('type') !== 'submit')
                    fieldsList.push(th);
            });
        }

        // Записываем список всех селектов в форме
        if (selects !== null && selects.actors !== null) {
            selects.actors.forEach((th) => {
                fieldsList.push(th);
            });
        }

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
        this.formFields.forEach((field) => {
            if (field.getAttribute('type') !== "submit") {
                data += field.getAttribute('name') + "=" + field.value;
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
        this.actors.forEach((actor) => {
            actor.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!stopIsNotValidate)
                    ajaxPost(form.attr('action'), form.serialize(), func);
                else {
                    let error = 0;
                    this.formFields.forEach(function (field) {
                        if (!el(field, 'field').validate())
                            error++;
                    });
                    if (error === 0)
                        ajaxPost(form.attr('action'), form.serialize(), func);
                }
                return false;
            });
        })
    }

}