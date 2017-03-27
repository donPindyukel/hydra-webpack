// ==========================================================================
// Компонент слайдера
// ==========================================================================

class ElSlider extends Element {

    constructor(actor) {
        super(actor);
        this.activeStep = 1;
        this.allSteps = 0;
        this.allSlideWidth = 0;
        this.singleSlideWidth = 0;
        this.leftModif = 0;
        this.body = null;
        this.sliders = [];
        return this;
    }

    /**
     * Иницилизация слайдера
     * @param bodyClassName - имя класса, в котором содержатся слайды
     * @param slideClassName - имя класса слайда
     * @param countSlidePrint - пока не используется в системе.
     */
    initSlider(bodyClassName = '.slider-body', slideClassName = '.slide', countSlidePrint = 1) {
        let body = this.find(bodyClassName);

        // Получаем контейнер, который удем двигать по right позиции
        // в нем содержаться все слайды
        if (body.length > 0)
            this.body = this.find(bodyClassName)[0];

        // Получаем список всех слайдов и настраиваем их
        this.sliders = this.find(slideClassName);
        this.sliders.forEach((th) => {

            // Актуальная длина и высота слайда
            let newWidth = parseInt(th.css('width'));
            let newHeight = this.height();
            // Изменения длины во внешнем и внутреннем отступах
            let leftRight = 0;

            // Калькулируем значение внутренних отступов
            // в зависимости от количество параметров в padding
            let cleanPadding = th.css('padding').replace(/px/g, '');
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
            let cleanMargin = th.css('margin').replace(/px/g, '');
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
            th.attr('style', 'min-width: ' + newWidth + 'px; height: ' + newHeight + 'px;');

            // Длина одного слайда
            this.singleSlideWidth = parseInt(newWidth + leftRight);
            // Сумарная длина всех слайдов
            this.allSlideWidth += newWidth + leftRight;
            // Количество шагов
            this.allSteps++;
        });

        // Убираем из общей длины, длину равную одного слайда.
        this.allSlideWidth -= this.singleSlideWidth;
    }


    /**
     * Следующий слайд
     * @returns {ElSlider}
     */
    nextSlide() {
        if (this.activeStep < this.allSteps) {
            this.activeStep++;
            this.leftModif += this.singleSlideWidth;
        }
        this.body.attr('style', 'width: ' + this.allSlideWidth + 'px; right: ' + this.leftModif + 'px');
        return this;
    }

    /**
     * Предыдущий слайд
     * @returns {ElSlider}
     */
    prevSlide() {
        if (this.activeStep > 1) {
            this.activeStep--;
            this.leftModif -= this.singleSlideWidth;
        }
        this.body.attr('style', 'width: ' + this.allSlideWidth + 'px; right: ' + this.leftModif + 'px');
        return this;
    }

    /**
     * Открыть слайд по номеру
     * @param num
     * @returns {ElSlider}
     */
    openSlide(num) {
        let clickNext = 0;
        let typeScroll = 'next';

        if (num <= this.sliders.length && num > 0) {
            // Если номер слайда больше активного слайда
            if (num > this.activeStep) {
                clickNext = num - this.activeStep;
                typeScroll = 'next';
            }
            // Если номер слайда меньше активного слайда
            if (num < this.activeStep) {
                clickNext = this.activeStep - num;
                typeScroll = 'prev';
            }

            for (let i = 0; i < clickNext; i++) {
                if (typeScroll === 'next')
                    this.nextSlide();
                if (typeScroll === 'prev')
                    this.prevSlide();
            }
        }
        return this;
    }

    /**
     * Возвращает количество слайдов в слайдере
     * @returns {Number}
     */
    countSlides() {
        return this.sliders.length;
    }

}
