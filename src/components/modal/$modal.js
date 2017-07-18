// ==========================================================================
// Компонент модального окна
// ==========================================================================

(function ($) {
	/**
     * Показать модальное окно
     * @param animatedClass анимация показа
     * @param animateDeleteTimeout время удаления анимации
     */
	$.fn.modalShow = function (animatedClass = modalAnimateClassShow,
		animateDeleteTimeout = modalAnimateDeleteTimeout) {
		if (animatedClass !== null) {
			this.addClass(animatedClass);
			this.removeClassTimeout(animatedClass, animateDeleteTimeout);
		}
		this.addClass('show');
	};

	/**
     * Скрыть модальное окно
     * @param animatedClass анимация скрытия
     * @param animateDeleteTimeout время удаления анимации
     */
	$.fn.modalHide = function (animatedClass = modalAnimateClassHide,
		animateDeleteTimeout = modalAnimateDeleteTimeout) {
		if (animatedClass !== null) {
			this.addClass(animatedClass);
			this.removeClassTimeout(animatedClass, animateDeleteTimeout);

			let th = this;

			setTimeout(() => {
				th.removeClass('show');
			}, animateDeleteTimeout);
		} else {
			this.removeClass('show');
		}
	};
})(jQuery);
