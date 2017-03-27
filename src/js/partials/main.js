//
//
//

let slider = el('.slider', 'slider')[0];

slider.initSlider('.slider-body', '.slide', 1);

let buttonNext = el('.button.slide-next', 'button')[0];
let buttonPrev = el('.button.slide-prev', 'button')[0];

buttonNext.eventClick((th) => {
   slider.nextSlide();
});

buttonPrev.eventClick((th) => {
   slider.prevSlide();
});
