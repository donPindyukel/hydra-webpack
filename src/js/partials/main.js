//
//
//

let slider = el('.slider', 'slider')[0];

slider.initSlider();

let buttonNext = el('.button', 'button')[0];
buttonNext.eventClick((th) => {
   slider.nextSlide();
});
