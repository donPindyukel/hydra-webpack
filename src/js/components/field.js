// ==========================================================================
// Компонент поля в форме
// ==========================================================================

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
        let result = null;

        if (value !== null) {
            this.actors.forEach((actor) => {
                actor.value = value;
            });
        }

        this.actors.forEach((actor) => {
            result = actor.value;
        });

        return result;
    }

    /**
     * Проверяем checked ли checkbox или radio
     * @param value
     * @returns {Element.checked}
     */
    checked(value = null) {
        let result = null;

        if (value !== null) {
            this.actors.forEach((actor) => {
                actor.checked = value;
            });
        }

        this.actors.forEach((actor) => {
            result = actor.checked;
        });

        return result;
    }

    /**
     * Возвращает результат валидации элемента
     * @param validType
     * @param dataParamsName
     * @returns {boolean}
     */
    validate(validType = fieldValidType, dataParamsName = fieldValidDataName) {
        // По длине строки
        if (validType === 'length') {
            let dataValid = 0;
            if (this.hasData(dataParamsName))
                dataValid = parseInt(this.data(dataParamsName));
            return (this.val().length >= dataValid);
        }

        // Выбран ли элемент или нет
        if (validType === 'checked') {
            let dataValid = false;
            if (this.hasData(dataParamsName))
                dataValid = Boolean(this.data(dataParamsName));
            return (this.checked() === dataValid);
        }
    }

    /**
     * Событие изменения элемента
     * @param func колбэк
     */
    eventChange(func) {
        this.actors.forEach((th) => {
            th.addEventListener('change', () => {
                func(this);
            });
        });
        return this;
    }

    /**
     * Валидация элементов после внесения в них изменения
     * @param successClass
     * @param errorClass
     * @param validType
     * @param removeClassTimeout
     * @param dataParamsName
     */
    eventValidate(successClass = fieldValidSuccessClass,
                  errorClass = fieldValidErrorClass,
                  removeClassTimeout = fieldValidRemoveClassTimeout,
                  validType = fieldValidType,
                  dataParamsName = fieldValidDataName) {
        this.eventChange(function (th) {
            if (th.validate(validType, dataParamsName)) {
                th.addClass(successClass);
                if (removeClassTimeout !== null)
                    th.removeClassTimeout(successClass, removeClassTimeout);
            }
            else {
                th.addClass(errorClass);
                if (removeClassTimeout !== null)
                    th.removeClassTimeout(errorClass, removeClassTimeout);
            }
        });
        return this;
    }

}