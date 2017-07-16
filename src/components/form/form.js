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
		let th = this;

		// Защита от спама
		if (activeAntiSpam) {
			setTimeout(() => {
				th.append(`<input type="hidden" name="hash" class="hash" value="${formAntiSpamHashKey}">`);
			}, 1000);
		}

		// Отлавливаем событие нажатия на сабмит
		this.on('submit', function (e) {
			let form = $(this);

			e.preventDefault();
			if (!stopIsNotValidate) {
				ajaxPost(form, form.attr('action'), form.serialize(), func);
			} else {
				let error = 0;

				form.find('input').each(function () {
					let field = $(this);

					if (!field.fieldValidate()) {
						error++;
						field.change();
					}
				});
				if (error === 0) {
					ajaxPost(form, form.attr('action'), form.serialize(), func);
				}
			}

			return false;
		});
	};
})(jQuery);
