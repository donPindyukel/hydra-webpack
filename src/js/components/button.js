// ==========================================================================
// Компонент кнопки
// ==========================================================================

(function ($) {
	/**
     * Функционал фильтровки выводимого контента.
     * @param globalClass - общий класс контента, которым нужно управлять
     * @param dataTargetName - data аттрибут у кнопки для указания ключа
     * @param dataActorName - data аттрибут ключа у управляемого элемента
     * @param hideClass - класс для скрытия элементов
     */
	$.fn.buttonFilter = function (globalClass,
		dataTargetName = buttonFilterDataTargetName,
		dataActorName = buttonFilterDataActorName,
		hideClass = globalHideClass) {
		let targetsList = $(globalClass);

		this.click(function () {
			let button = $(this);

			targetsList.each(function () {
				let target = $(this);

				target.addClass(hideClass);

				if (button.attr(`data-${dataTargetName}`) && target.attr(`data-${dataActorName}`)) {
					if (button.data(dataTargetName) === target.data(dataActorName)) {
						target.removeClass(hideClass);
					}
				}
			});
		});
	};
})(jQuery);
