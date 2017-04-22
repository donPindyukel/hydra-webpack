

let slider = el('.slider', 'slider');
slider.initSlider();

el('.button-prev', 'button').eventClick(() => {
    slider.prevSlide()
});

el('.button-next', 'button').eventClick(() => {
    slider.nextSlide()
});

el('.button-open', 'button').eventClick((th) => {
    log(th.data('id'));
    slider.openSlide(th.data('id'));
});