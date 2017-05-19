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
        let form = this;

        // Защита от спама
        if (activeAntiSpam) {
            setTimeout(function () {
                form.append('<input type="hidden" name="hash" class="hash" value="'+ formAntiSpamHashKey +'">');
            }, 1000);
        }

        // Отлавливаем событие нажатия на сабмит
        form.on('submit', function (e) {
            e.preventDefault();
            if (!stopIsNotValidate)
                ajaxPost(form.attr('action'), form.serialize(), func);
            else {
                let error = 0;
                form.find('input').each(function () {
                    let field = $(this);
                    if (!field.fieldValidate())
                        error++;
                });
                if (error === 0)
                    ajaxPost(form.attr('action'), form.serialize(), func);
            }
            return false;
        });
    };

})(jQuery);