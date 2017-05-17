// ==========================================================================
// Компонент слайдера
// ==========================================================================

(function ($) {

    let activeStep = 1;
    let allSteps = 0;
    let allSlideWidth = 0;
    let singleSlideWidth = 0;
    let leftModif = 0;
    let body = null;
    let sliders = [];

    /**
     * Иницилизация слайдера
     * @param bodyClassName - имя класса, в котором содержатся слайды
     * @param slideClassName - имя класса слайда
     * @param countSlidePrint - пока не используется в системе.
     */
    $.fn.sliderInit = function (bodyClassName = '.slider-body',
                                slideClassName = '.slide',
                                countSlidePrint = 1) {
        let slider = this;

        // Получаем контейнер, который будем двигать по right позиции
        // в нем содержаться все слайды
        body = this.find(bodyClassName);

        // Получаем список всех слайдов и настраиваем их
        sliders = this.find(slideClassName);
        sliders.each(function () {
            let slide = $(this);

            // Актуальная длина и высота слайда
            let newWidth = parseInt(slide.css('width'));
            let newHeight = slider.height();
            // Изменения длины во внешнем и внутреннем отступах
            let leftRight = 0;

            // Калькулируем значение внутренних отступов
            // в зависимости от количество параметров в padding
            let cleanPadding = slide.css('padding').replace(/px/g, '');
            let multipleValuePadding = cleanPadding.split(' ');
            if (multipleValuePadding.length === 1) {
                newWidth -= cleanPadding * 2;
                newHeight -= cleanPadding * 2;
                leftRight += cleanPadding * 2;
            }
            else if (multipleValuePadding.length === 2) {
                let topButton = parseInt(multipleValuePadding[0]);
                let leftRight = parseInt(multipleValuePadding[1]);
                newWidth -= leftRight * 2;
                newHeight -= topButton * 2;
                leftRight += leftRight * 2;
            }
            else if (multipleValuePadding.length === 3) {
                let top = parseInt(multipleValuePadding[0]);
                let leftRight = parseInt(multipleValuePadding[1]);
                let button = parseInt(multipleValuePadding[2]);
                newWidth -= leftRight * 2;
                newHeight -= (top + button);
                leftRight += leftRight * 2;
            }
            else if (multipleValuePadding.length === 4) {
                let top = parseInt(multipleValuePadding[0]);
                let right = parseInt(multipleValuePadding[1]);
                let button = parseInt(multipleValuePadding[2]);
                let left = parseInt(multipleValuePadding[3]);
                newWidth -= (right + left);
                newHeight -= (top + button);
                leftRight += (right + left);
            }

            // Калькулируем значение внешних отступов
            // в зависимости от количество параметров в margin
            let cleanMargin = slide.css('margin').replace(/px/g, '');
            let multipleValueMargin = cleanMargin.split(' ');
            if (multipleValueMargin.length === 1) {
                newWidth -= cleanMargin * 2;
                newHeight -= cleanMargin * 2;
                leftRight += cleanMargin * 2;
            }
            else if (multipleValueMargin.length === 2) {
                let topButton = parseInt(multipleValueMargin[0]);
                let leftRight = parseInt(multipleValueMargin[1]);
                newWidth -= leftRight * 2;
                newHeight -= topButton * 2;
                leftRight += leftRight * 2;
            }
            else if (multipleValueMargin.length === 3) {
                let top = parseInt(multipleValueMargin[0]);
                let leftRight = parseInt(multipleValueMargin[1]);
                let button = parseInt(multipleValueMargin[2]);
                newWidth -= leftRight * 2;
                newHeight -= (top + button);
                leftRight += leftRight * 2;
            }
            else if (multipleValueMargin.length === 4) {
                let top = parseInt(multipleValueMargin[0]);
                let right = parseInt(multipleValueMargin[1]);
                let button = parseInt(multipleValueMargin[2]);
                let left = parseInt(multipleValueMargin[3]);
                newWidth -= (right + left);
                newHeight -= (top + button);
                leftRight += (right + left);
            }

            // Выставляем размеры для слайда
            slide.attr('style', 'min-width: ' + newWidth + 'px; height: ' + newHeight + 'px;');

            // Длина одного слайда
            singleSlideWidth = parseInt(newWidth + leftRight);
            // Сумарная длина всех слайдов
            allSlideWidth += newWidth + leftRight;
            // Количество шагов
            allSteps++;
        });

        // Убираем из общей длины, длину равную одного слайда.
        allSlideWidth -= singleSlideWidth;
    };

    /**
     * Следующий слайд
     */
    $.fn.sliderNext = function () {
        if (activeStep < allSteps) {
            activeStep++;
            leftModif += singleSlideWidth;
        }
        body.attr('style', 'width: ' + allSlideWidth + 'px; right: ' + leftModif + 'px');
    };

    /**
     * Предыдущий слайд
     */
    $.fn.sliderPrev = function () {
        if (activeStep > 1) {
            activeStep--;
            leftModif -= singleSlideWidth;
        }
        body.attr('style', 'width: ' + allSlideWidth + 'px; right: ' + leftModif + 'px');
    };

    /**
     * Открыть слайд по номеру
     * @param num номер слайда
     */
    $.fn.sliderOpenNumber = function (num) {
        let clickNext = 0;
        let typeScroll = 'next';

        if (num <= sliders.length && num > 0) {
            // Если номер слайда больше активного слайда
            if (num > activeStep) {
                clickNext = num - activeStep;
                typeScroll = 'next';
            }
            // Если номер слайда меньше активного слайда
            if (num < activeStep) {
                clickNext = activeStep - num;
                typeScroll = 'prev';
            }

            for (let i = 0; i < clickNext; i++) {
                if (typeScroll === 'next')
                    this.nextSlide();
                if (typeScroll === 'prev')
                    this.prevSlide();
            }
        }
    };

    /**
     * Количество слайдов в слайдере
     * @returns {Number}
     */
    $.fn.sliderCount = function () {
        return sliders.length;
    };

})(jQuery);

