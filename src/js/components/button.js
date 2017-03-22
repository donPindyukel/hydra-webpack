// ==========================================================================
// Компонент кнопки
// ==========================================================================

/**
 * Точка входа в кнопку
 * @param actor
 * @returns {ElButton}
 */
function el_button(actor) {
    let elm = new ElButton(actor);
    elm.initAll();
    return elm;
}


class ElButton extends Element {

    constructor(actor) {
        super(actor);
    }

    initAll() {
        let allList = document.querySelectorAll(this.name);
        for (let i = 0; i < allList.length; i++) {
            let elm = new ElButton(allList[i]);
            elm.name = this.name;
            this.all.push(elm);
        }
    }

    /**
     * Функционал фильтровки выводимого контента
     * @param globalClass - общий класс контента, которым нужно управлять
     * @param dataTargetName - data аттрибут у кнопки для указания ключа
     * @param dataActorName - data аттрибут ключа у управляемого элемента
     * @param hideClass - класс для скрытия элементов
     */
    filter(globalClass, dataTargetName = 'target', dataActorName = 'actor', hideClass = 'hide') {
        let targetsList = el(globalClass);

        this.eventClick(function (button) {
            targetsList.each(function (target) {
                target.addClass(hideClass);

                if (button.hasData(dataTargetName) && target.hasData(dataActorName)) {
                    if (button.data(dataTargetName) == target.data(dataActorName)) {
                        target.removeClass(hideClass);
                    }
                }
            });
        }, true);
    }
}