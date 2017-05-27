//
// $('.js-modal').modalShow();
//
// setTimeout(function () {
//     $('.js-modal').modalHide();
// }, 2000);

$('.range-slider__range').fieldInitRangeSlider();

$('.preloader').lazyPreloader();

$('.js-filter').buttonFilter('.js-content');

$('.js-input').fieldEventValidate();

$('.js-ajax-form').formAjax(function (data) {
    log(data);
}, true);

$('.js-lazy').lazyShowIfVisible();
$('.js-lazy-img').lazyLoadImage('img', 'src', true, function () {
    log('test');
});

$('.js-slider').sliderInit();

$('.js-prev').click(function () {
    $(this).sliderPrev();
});

$('.js-next').click(function () {
    $(this).sliderNext();
});

$('.js-slide').click(function () {
    let dataSlide = $(this).data('slide');
    $(this).sliderOpenNumber(dataSlide);
});
