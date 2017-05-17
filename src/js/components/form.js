// ==========================================================================
// Компонент формы
// ==========================================================================

(function ($) {

    /**
     * Отправка данных с формы
     * @param func Выполняемая функция после отправки данных
     * @param stopIsNotValidate Валидация формы true/false
     */
    $.fn.formAjax = function (func, stopIsNotValidate = formStopIsNotValidate) {
        let form = this;
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