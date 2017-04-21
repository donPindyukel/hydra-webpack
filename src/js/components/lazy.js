// ==========================================================================
// Компонент ленивой загрузки
// ==========================================================================

class ElLazy extends Element {

    constructor(actor) {
        super(actor);
        this.showIfVisibleEnd = false;
        return this;
    }

    /**
     * Применять стили к элементу, если доскролили до него
     * @param offset изменить радиус воздействия, от 0 до 1 (% соотношение)
     * @param addClass - имя класса для добавления при срабатывании
     * @param removeClass - имя класса для удаления при срабатывании
     * @param func - функция, которую нужно запустить при срабатывании
     */
    showIfVisible(offset = 0, addClass = 'show', removeClass = 'hide', func = function () {}) {
        // Получаем положение элемента относительно начала страницы
        let elementOffset = el(this.actors).offsetTop();

        // Если не можем определить, берем у отступ у родителя
        if (elementOffset === 0) {
            let parentElement = this.parent();
            log(parentElement);
            elementOffset = parentElement.offsetTop();
        }

        // Отслеживаем прокручивание страницы
        window.addEventListener('scroll', () => {
            if (this.showIfVisibleEnd === false) {
                // Получаем данные о положении у элементов
                let customOffset = document.body.scrollTop + window.innerHeight;
                customOffset -= customOffset * offset;

                // Если мы дошли до элемента, применяем стили функцию
                if (customOffset > elementOffset) {
                    if (addClass !== null)
                        this.addClass(addClass);
                    if (removeClass !== null)
                        this.removeClass(removeClass);
                    func(this);
                    this.showIfVisibleEnd = true;
                }
            }
        });

        return this;
    }

    /**
     * Ленивая загрузка изображений. Показывает изображение при прокрутке страницы.
     * @param type - тип ленивой загрузки (img, bg)
     * @param dataName - имя дата аттрибута, откуда брать ссылку на изображение
     */
    loadImage(type = 'img', dataName = 'src') {

    }

}