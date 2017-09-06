// ==========================================================================
// Компонент модального окна
// ==========================================================================

(function ($) {
  /**
     * Показать модальное окно
     * @param animatedClass анимация показа
     * @param animateDeleteTimeout время удаления анимации
     */
  $.fn.modalShow = function (animatedClass, animateDeleteTimeout) {
    let th = $(this);

    if (animatedClass !== null) {
      th.addClass(animatedClass);

      setTimeout(() => {
        th.removeClass(animatedClass);
      }, animateDeleteTimeout);
    }
    this.addClass('show');
  };

  /**
     * Скрыть модальное окно
     * @param animatedClass анимация скрытия
     * @param animateDeleteTimeout время удаления анимации
     */
  $.fn.modalHide = function (animatedClass, animateDeleteTimeout) {
    let th = $(this);

    if (animatedClass !== null) {
      th.addClass(animatedClass);

      setTimeout(() => {
        th.removeClass(animatedClass);
        th.removeClass('show');
      }, animateDeleteTimeout);
    } else {
      this.removeClass('show');
    }
  };
})(jQuery);
