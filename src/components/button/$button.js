// ==========================================================================
// Компонент кнопки
// ==========================================================================

(function ($) {
  /**
   * Функционал фильтровки выводимого контента.
   * @param globalClass - общий класс контента, которым нужно управлять
   * @param dataName - атрибут у кнопки и элемента для указания уникального ключа
   * @param hideClass - класс для скрытия элементов
   */
  $.fn.buttonFilter = function (globalClass, dataName, hideClass) {
    let targetsList = $(globalClass);

    this.click(function () {
      let button = $(this);

      targetsList.each(function () {
        let target = $(this);

        target.addClass(hideClass);

        if (button.attr(`data-${dataName}`) && target.attr(`data-${dataName}`)) {
          if (button.data(dataName) === target.data(dataName)) {
            target.removeClass(hideClass);
          }
        }
      });
    });
  };
})(jQuery);
