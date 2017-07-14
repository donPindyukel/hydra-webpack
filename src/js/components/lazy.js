// ==========================================================================
// Компонент ленивой загрузки
// ==========================================================================

(function ($) {
	/**
     * Прелоадер на странице, который скрывает весь контент
     * и исчезает после окончания загрузки страницы
     * @param hideClass - имя скрывающего контент класса
     * @param func - функция, которую нужно запустить при срабатывании
     */
	$.fn.lazyPreloader = function (hideClass = globalHideClass, func = function () {}) {
		let th = this;

		$(window).on('load', () => {
			th.fadeOut(300);
			th.addClassTimeout(hideClass, 300);
		});
	};

	/**
     * Применять стили к элементу, если доскролили до него
     * @param offset изменить радиус воздействия, от 0 до 1 (% соотношение)
     * @param addClass - имя класса для добавления при срабатывании
     * @param removeClass - имя класса для удаления при срабатывании
     * @param func - функция, которую нужно запустить при срабатывании
     */
	$.fn.lazyShowIfVisible = function (offset = 0,
		addClass = 'show',
		removeClass = 'hide',
		func = function () {}) {
		let th = this;
		let showIfVisibleEnd = false;

		// Получаем положение элемента относительно начала страницы
		let elementOffset = th.offset().top;

		// Если не можем определить, берем отступ у родителя
		if (elementOffset === 0) {
			let parentElement = th.parent();

			elementOffset = parentElement.offset().top;
		}

		$(window).scroll(() => {
			if (showIfVisibleEnd === false) {
				// Вычисляем срабатываемую область
				let customOffset = document.body.scrollTop + window.innerHeight;

				customOffset -= customOffset * offset;

				// Если мы дошли до элемента, применяем стили функцию
				if (customOffset > elementOffset) {
					if (addClass !== null) {
						th.addClass(addClass);
					}
					if (removeClass !== null) {
						th.removeClass(removeClass);
					}
					func(th);
					showIfVisibleEnd = true;
				}
			}
		});
	};

	/**
     * Ленивая загрузка изображений. Показывает изображение при прокрутке страницы.
     * @param type - тип ленивой загрузки (img, bg)
     * @param dataName - имя дата аттрибута, откуда брать ссылку на изображение
     * @param showAfterReadyPage показать изображение после загрузки страницы
     * @param func - функция, которую нужно запустить при срабатывании
     */
	$.fn.lazyLoadImage = function (type = 'img',
		dataName = 'src',
		showAfterReadyPage = false,
		func = function () {}) {
		let dataSrc = null;
		let th = this;

		if (this.data(dataName)) {
			dataSrc = this.data(dataName);

			// Прогружать при пролистывании
			this.lazyShowIfVisible(0, null, null, () => {
				if (type === 'img') {
					th.attr('src', dataSrc);
				} else if (type === 'bg') {
					th.attr('style', `background-image: url(${dataSrc})`);
				}
			});

			// Прогружать после загрузки страницы
			if (showAfterReadyPage) {
				$(window).on('load', () => {
					setTimeout(() => {
						if (type === 'img') {
							th.attr('src', dataSrc);
						} else if (type === 'bg') {
							th.attr('style', `background-image: url(${dataSrc})`);
						}
					}, 1000);
				});
			}
		}
	};
})(jQuery);
