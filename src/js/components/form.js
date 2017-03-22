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

    initAll() {
        let allList = document.querySelectorAll(this.name);
        for (let i = 0; i < allList.length; i++) {
            let elm = new ElForm(allList[i]);
            elm.name = this.name;
            this.all.push(elm);
        }
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
     * Возвращает результат валидации элемента
     * @param validType
     * @param dataParamsName
     * @returns {boolean}
     */
    validate(validType = 'length', dataParamsName = 'valid') {

        // По длине строки
        if (validType == 'length') {
            let dataValid = parseInt(this.data(dataParamsName));
            return (this.val().length >= dataValid);
        }

        // Выбран ли элемент или нет
        if (validType == 'checked') {
            let dataValid = Boolean(this.data(dataParamsName));
            return (this.checked() == dataValid);
        }
    }

    /**
     * Событие изменения элемента
     * @param func колбэк
     * @param all применять ко всем
     */
    eventChange(func, all = false) {
        if (!all) {
            this.actor.addEventListener('change', () => {
                func(this);
            });
        }
        else {
            this.each(function (e) {
                e.actor.addEventListener('change', () => {
                    func(e);
                });
            });
        }
    }

    /**
     * Валидация элементов после внесения в них изменения
     * @param successClass
     * @param errorClass
     * @param validType
     * @param dataParamsName
     * @param all
     */
    eventValidate(successClass = null, errorClass = null, validType = 'length', dataParamsName = 'valid', all = false) {
        this.eventChange(function (th) {

            if (th.validate(validType, dataParamsName)) {
                th.addClass(successClass);
                th.removeClassTimeout(successClass, false, 1000);
            }
            else {
                th.addClass(errorClass);
                th.removeClassTimeout(errorClass, false, 1000);
            }

        }, all);
    }

}