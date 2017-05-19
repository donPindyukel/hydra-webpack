// ==========================================================================
// Файл настроек для компонентов
// ==========================================================================

let globalHideClass = 'hide';

//
// Компонент полей (Field)
//

/**
 * Дата аттрибут у поля, с которого брать настройки для валидации
 * data-NAME
 * data-valid='4' для length (число любое)
 * data-valid='true' для checked
 * @type {string}
 */
let fieldValidDataName = 'valid';

/**
 * Класс, который добавляется к полю при успешной валидации
 * @type {string}
 */
let fieldValidSuccessClass = 'validate-success';

/**
 * Класс, который добавляется к полю при провальной валидации
 * @type {string}
 */
let fieldValidErrorClass = 'validate-error';

/**
 * Таймаут, через который удалять классы валидации
 * null если не удалять
 * @type {number}
 */
let fieldValidRemoveClassTimeout = 1000;

//
// Компонент формы (Form)
//

/**
 * Не отправлять данные с формы, если поля не прошли валидацию
 * @type {boolean}
 */
let formStopIsNotValidate = true;

/**
 * Управление системой антиспама.
 * Добавляет в форму скрытое поле через 1 секунду после загрузки страницы.
 * По этому полю можно проверить, бот это или нет.
 * @type {boolean}
 */
let formActiveAntiSpam = true;

/**
 * Ключевое слово, которое добавляется в hash поле для проверки при отправки с формы
 * @type {string}
 */
let formAntiSpamHashKey = 'success';

//
// Компонент кнопки (Button)
//

/**
 * Для фильтрации контента по клику на кнопку
 * Имя data аттрибута у кнопки, по которой искать цель для фильтрации
 * data-NAME=''
 * По этому атрибуту будет найдена цель и выведена из режима скрытия
 * @type {string}
 */
let buttonFilterDataTargetName = 'target';

/**
 * Для фильтрации контента по клику на кнопку
 * Имя data аттрибута у цели.
 * data-NAME=''
 * @type {string}
 */
let buttonFilterDataActorName = 'actor';

//
// Компонент модального окна (Modal)
//

/**
 * Анимация появления модального окна
 * @type {string}
 */
let modalAnimateClassShow = 'fadeIn';

/**
 * Анимация скрытия модального окна
 * @type {string}
 */
let modalAnimateClassHide = 'fadeOut';

/**
 * Таймаут удаления анимаций у модального окна
 * и добавление класса скрытия globalHideClass
 * @type {number}
 */
let modalAnimateDeleteTimeout = 1000;




