// ==========================================================================
// Глобальные скрипты
// ==========================================================================

let slider = $('.js-slider');
slider.sliderInit('.slider__body', '.slider__item');

slider.sliderAutoscroll();

$('.js-slider-next').click(function () {
    slider.sliderNext()
});