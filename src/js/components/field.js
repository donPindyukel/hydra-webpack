// ==========================================================================
// Компонент поля в форме
// ==========================================================================

/**
 * Точка входа в поле
 * @param actor
 * @returns {Array}
 */
function el_field(actor) {
    let elements = [];

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElField(selectElements[i]));
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        let selectElements = actor;
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElField(selectElements[i]));
    }

    return elements;
}

class ElField extends Element {

    constructor(actor) {
        super(actor);
        this.formFields = [];
        return this;
    }

    /**
     * Возвращает значение value у текстового поля
     * @param value
     */
    val(value = null) {
        if (value !== null)
            this.actor.value = value;
        return this.actor.value;
    }

    /**
     * Проверяем checked ли checkbox или radio
     * @param value
     * @returns {Element.checked}
     */
    checked(value = null) {
        if (value !== null)
            this.actor.checked = value;
        return this.actor.checked;
    }

    /**
     * Возвращает результат валидации элемента
     * @param validType
     * @param dataParamsName
     * @returns {boolean}
     */
    validate(validType = 'length', dataParamsName = 'valid') {
        // По длине строки
        if (validType === 'length') {
            let dataValid = parseInt(this.data(dataParamsName));
            return (this.val().length >= dataValid);
        }

        // Выбран ли элемент или нет
        if (validType === 'checked') {
            let dataValid = Boolean(this.data(dataParamsName));
            return (this.checked() === dataValid);
        }
    }

    /**
     * Событие изменения элемента
     * @param func колбэк
     */
    eventChange(func) {
        this.actor.addEventListener('change', () => {
            func(this);
        });
        return this;
    }

    /**
     * Валидация элементов после внесения в них изменения
     * @param successClass
     * @param errorClass
     * @param validType
     * @param dataParamsName
     */
    eventValidate(successClass = null, errorClass = null, validType = 'length', dataParamsName = 'valid') {
        this.eventChange(function (th) {
            if (th.validate(validType, dataParamsName)) {
                th.addClass(successClass);
                th.removeClassTimeout(successClass, 1000);
            }
            else {
                th.addClass(errorClass);
                th.removeClassTimeout(errorClass, 1000);
            }
        });
        return this;
    }

}