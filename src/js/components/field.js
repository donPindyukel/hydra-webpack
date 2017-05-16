// ==========================================================================
// Компонент поля в форме
// ==========================================================================

(function ($) {

    /**
     * Валидация поля формы
     * @param dataParamsName
     * @returns {boolean}
     */
    $.fn.fieldValidate = function (dataParamsName = fieldValidDataName) {
        if (this.attr('type')) {

            // Текстовое поле по длине строки
            if (this.attr('type') === 'text' || this.attr('type') === 'number'
                || this.attr('type') === 'tel' || this.attr('type') === 'password') {
                let dataValid = parseInt(this.data(dataParamsName));
                return (this.val().length >= dataValid);
            }

            // Радио или чекбокс по checked
            if (this.attr('type') === 'radio' || this.attr('type') === 'checkbox') {
                let dataValid = Boolean(this.data(dataParamsName));
                return (this.prop('checked') === dataValid);
            }
        }
    };

    /**
     *
     * @param successClass
     * @param errorClass
     * @param removeClassTimeout
     * @param dataParamsName
     */
    $.fn.fieldEventValidate = function (successClass = fieldValidSuccessClass,
                                        errorClass = fieldValidErrorClass,
                                        removeClassTimeout = fieldValidRemoveClassTimeout,
                                        dataParamsName = fieldValidDataName) {
        this.change(function () {
            let th = $(this);
            if (th.fieldValidate(dataParamsName)) {
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
    };

})(jQuery);