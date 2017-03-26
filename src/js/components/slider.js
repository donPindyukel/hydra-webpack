// ==========================================================================
// Компонент слайдера
// ==========================================================================

class ElSlider extends Element {

    constructor(actor) {
        super(actor);
        this.allSlideWidth = 0;
        this.singleSlideWidth = 0;
        this.leftModif = 0;
        this.body = null;
        this.sliders = [];
        return this;
    }

    initSlider(bodyClassName = '.slider-body', slideClassName = '.slide') {
        let body = this.find(bodyClassName);

        if (body.length > 0)
            this.body = this.find(bodyClassName)[0];

        this.sliders = this.find(slideClassName);
        this.sliders.forEach((th) => {
            let padding = parseInt(th.css('padding').replace('px', ''));
            let newWidth = this.width() - padding * 2;
            th.attr('style', 'min-width: ' + newWidth + 'px');

            this.allSlideWidth += th.width();
            this.singleSlideWidth = th.width();
        });

    }

    nextSlide() {
        this.leftModif += this.singleSlideWidth;
        this.body.attr('style', 'width: '+ this.allSlideWidth +'px; left: -'+ this.leftModif +'px');
    }

}
