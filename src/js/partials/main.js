//
//
//

let slider = el('.slider', 'slider')[0];

slider.initSlider('.slider-body', '.slide', 1);

let buttonNext = el('.button.slide-next', 'button')[0];
let buttonPrev = el('.button.slide-prev', 'button')[0];
let buttonOpen = el('.button.slide-open', 'button');

log(slider.countSlides());

buttonNext.eventClick((th) => {
   slider.nextSlide();
});

buttonPrev.eventClick((th) => {
   slider.prevSlide();
});

buttonOpen.forEach(function (button) {
    button.eventClick((th) => {
        let dataSlide = th.data('slide');
        slider.openSlide(dataSlide);
    });
});

//
//
//

let forms = el('.js-ajax-form', 'form');

forms.forEach(function (form) {
   form.eventSubmit(function (response, status) {
       log(response);
   }, false);
});
