// ==========================================================================
// Компонент кнопки
// ==========================================================================

/**
 * Точка входа в кнопку
 * @param actor
 * @returns {Array}
 */
function el_button(actor) {
    let elements = [];

    if (typeof actor === 'string') {
        let selectElements = document.querySelectorAll(actor);
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElButton(selectElements[i]));
    }

    else if (typeof actor === 'object' && actor.length > 0) {
        let selectElements = actor;
        for (let i = 0; i < selectElements.length; i++)
            elements.push(new ElButton(selectElements[i]));
    }

    return elements;
}

class ElButton extends Element {

    constructor(actor) {
        super(actor);
        return this;
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
            each(targetsList, function (target) {
                target.addClass(hideClass);

                if (button.hasData(dataTargetName) && target.hasData(dataActorName)) {
                    if (button.data(dataTargetName) === target.data(dataActorName)) {
                        target.removeClass(hideClass);
                    }
                }
            })
        }, true);
    }
}