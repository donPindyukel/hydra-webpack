// ==========================================================================
// Компонент кнопки
// ==========================================================================

class Button {

    constructor(btn, modal) {
        this.eventBtn = document.querySelector(btn);
        this.actor = document.querySelector(modal);

        this.eventBtn.onclick = () => {
            this.show();
        }
    }

    show() {
        this.actor.classList.add('show')
    }

    hide() {
        this.actor.classList.remove('show');
    }
}