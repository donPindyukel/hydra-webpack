// ==========================================================================
// Компонент таймера обратного отсчета
// ==========================================================================

(function ($) {
	/**
     * Таймер обратного отсчета
     * @param day название класса или ID для присваивания дней
     * @param hour название класса или ID для присваивания часов
     * @param minute название класса или ID для присваивания минут
     * @param second название класса или ID для присваивания секунд
     * @param date присвоить дату, до которой считать
     * @param callback вызывается после истечения времени таймера
     */
	$.fn.countdownInit = function (day = '.js-day', hour = '.js-hour', minute = '.js-minute', second = '.js-second', date = null, callback = function () {}) {
		let end = false;
		let thDay = $(day);
		let thHour = $(hour);
		let thMinute = $(minute);
		let thSecond = $(second);

		// Если не задано время, устанавливаем на час вперед
		let nextDate = date;

		if (date === null || date === undefined) {
			nextDate = new Date().getTime() + 60 * 60 * 1000;
		}

		setInterval(() => {
			// Если время еще идет, обновляем данные элементов
			if (!end) {
				let date = new Date().getTime();
				let distance = nextDate - date;

				let days = Math.floor(distance / (1000 * 60 * 60 * 24));
				let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
				let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
				let seconds = Math.floor(distance % (1000 * 60) / 1000);

				if (distance > 0) {
					thDay.html(days);
					thHour.html(hours);
					thMinute.html(minutes);
					thSecond.html(seconds);
				}
				// Если время вышло, то ставим нули и скрываем кнопку оплаты
				else {
					thDay.html('0');
					thHour.html('0');
					thMinute.html('0');
					thSecond.html('0');
					end = true;
					callback();
				}
			}
		}, 1000);
	};
})(jQuery);
