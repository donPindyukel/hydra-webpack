// ==========================================================================
// Компонент поля в форме
// ==========================================================================

(function ($) {

    /**
     * Создание range slider
     * @returns {boolean}
     * @param dataMin
     * @param dataMax
     */
    $.fn.fieldInitRangeSlider = function (dataMin = 'min', dataMax = 'max') {
        let th = this;
        let min = th.data(dataMin);
        let max = th.data(dataMax);
        th.append('<span class="range-pointer"></span>');
        th.append('<input type="hidden" class="range-value" value="' + dataMin + '">');
        let pointer = th.find('.range-pointer');
        let value = th.find('.range-value');
        let widthSlider = th.width();
        let isMoviePointer = false;

        // Кликаем на область слайдера и туда переносим поинтер
        th.mousedown(function (e) {
            pointerMovie(e);
        });

        // Акцивация движения ползунка при клике
        pointer.mousedown(function () {
            isMoviePointer = true;
        });

        // Елси клик больше не нажат, отключаем движение
        pointer.mouseup(function () {
            isMoviePointer = false;
        });

        // Если покинули зону ползунка, отключаем движение
        th.mouseleave(function () {
            isMoviePointer = false;
        });

        // Движение поинтера за мышью
        th.bind('mousemove', function (e) {
            if (isMoviePointer)
                pointerMovie(e);
        });

        // Функция смены положения поинтера и записи value
        function pointerMovie(e) {
            // Вычисление положения ползунка
            let offsetLeft = th.offset().left;
            let left = e.pageX - offsetLeft - (pointer.width() / 2);
            let maxWidth = th.width(); //  offsetLeft;

            // Калькулирование значения текстового поля
            let calc = Math.round(left * max / th.width());

            // Позиционирование поинтера
            pointer.css('left', left + 'px');

            // Не отпускаем за максимальное и минимальное значения
            if (left < 0) pointer.css('left', '0px');
            if (left >= maxWidth) pointer.css('left', maxWidth + 'px');

            if (calc < min) calc = min;
            if (calc > max) calc = max;
            value.val(calc);
        }
    };

    /**
     * Валидация поля формы
     * @param dataParamsName
     * @returns {boolean}
     */
    $.fn.fieldValidate = function (dataParamsName = fieldValidDataName) {
        if (this.attr('type')) {

            // Текстовое поле по длине строки
            if (this.attr('type') === 'text' || this.attr('type') === 'number'
                || this.attr('type') === 'tel' || this.attr('type') === 'password'
                || this.attr('type') === 'email') {
                let dataValid = parseInt(this.data(dataParamsName));
                return (this.val().length >= dataValid);
            }

            // Радио или чекбокс по checked
            if (this.attr('type') === 'radio' || this.attr('type') === 'checkbox') {
                let dataValid = Boolean(this.data(dataParamsName));
                return (this.prop('checked') === dataValid);
            }

            return true;
        }
    };

    /**
     *
     * @param successClass
     * @param errorClass
     * @param removeClassTimeout
     * @param dataParamsName
     */
    $.fn.fieldEventValidate = function (successClass = fieldValidSuccessClass,
                                        errorClass = fieldValidErrorClass,
                                        removeClassTimeout = fieldValidRemoveClassTimeout,
                                        dataParamsName = fieldValidDataName) {
        this.change(function () {
            let th = $(this);

            if (th.fieldValidate(dataParamsName)) {
                th.addClass(successClass);
                if (removeClassTimeout !== null)
                    th.removeClassTimeout(successClass, removeClassTimeout);
            }
            else {
                th.addClass(errorClass);
                if (removeClassTimeout !== null)
                    th.removeClassTimeout(errorClass, removeClassTimeout);
            }
        });
    };

})(jQuery);
