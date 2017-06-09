// ==========================================================================
// Компонент формы
// ==========================================================================

(function ($) {

    /**
     * Отправка данных с формы
     * @param func Выполняемая функция после отправки данных
     * @param stopIsNotValidate Валидация формы true/false
     * @param activeAntiSpam
     */
    $.fn.formAjax = function (func, stopIsNotValidate = formStopIsNotValidate, activeAntiSpam = formActiveAntiSpam) {
        // Защита от спама
        if (activeAntiSpam) {
            setTimeout(function () {
                this.append('<input type="hidden" name="hash" class="hash" value="'+ formAntiSpamHashKey +'">');
            }, 1000);
        }

        // Отлавливаем событие нажатия на сабмит
        this.on('submit', function (e) {
            let form = $(this);
            e.preventDefault();
            if (!stopIsNotValidate)
                ajaxPost(form, form.attr('action'), form.serialize(), func);
            else {
                let error = 0;
                form.find('input').each(function () {
                    let field = $(this);
                    if (!field.fieldValidate())
                        error++;
                });
                if (error === 0)
                    ajaxPost(form, form.attr('action'), form.serialize(), func);
            }
            return false;
        });
    };

})(jQuery);