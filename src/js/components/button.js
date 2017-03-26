// ==========================================================================
// Компонент кнопки
// ==========================================================================

class ElButton extends Element {

    constructor(actor) {
        super(actor);
        return this;
    }

    /**
     * Событие клика по элементу
     * @param func колбэк
     */
    eventClick(func) {
        this.actor.addEventListener('click', () => {
            func(this);
        });
        return this;
    }

    /**
     * Функционал фильтровки выводимого контента
     * @param globalClass - общий класс контента, которым нужно управлять
     * @param dataTargetName - data аттрибут у кнопки для указания ключа
     * @param dataActorName - data аттрибут ключа у управляемого элемента
     * @param hideClass - класс для скрытия элементов
     */
    filter(globalClass,
           dataTargetName = buttonFilterDataTargetName,
           dataActorName = buttonFilterDataActorName, hideClass = globalHideClass) {
        let targetsList = el(globalClass);

        this.eventClick(function (button) {
            targetsList.forEach(function (target) {
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