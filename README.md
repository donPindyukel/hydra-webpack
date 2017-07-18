# Hydra Webpack
Стартовый пакет для верстки сайтов.

### Основные технологии разработки
- Gulp
- Pug
- Leaf (Vapor)
- Php
- SCSS
- ES6

### Установка
- Клонировать репозиторий
    - _git clone git@github.com:AlekseySkynox/hydra-webpack.git_
- Перейти в директорию со стартовым пакетом через терминал
    - npm i && bower i (требуется node.js и bower)
- Запуск сервера
    - _gulp (gulp build для простой сборки проекта)_


### Компоненты
Перед началом работы со стартовым пакетом, следует ознакомиться с компонентами и активно использовать их в разработке

- SCSS (миксины, использование: @include ИМЯ_МИКСИНА(параметры) в нужном классе)
    - animation (стандартные анимации)
    - button (кнопка с доп.эффектами)
    - form (стили для input, radio, select, range slider)
    - lazy (ленивая загрузка, прелоадер)
    - mixins (набор миксинов для создания hover, focus, media и так далее)
    - modal (модальное окно)
    - slider (адаптивный слайдер, выводящий по 1 слайду)
    - typography (набор миксинов для инициализации типографии классов)
    - untils (вспомогательные функции, такие как rem())

- JS (функциональное расширение компонентов SCSS, написанное как плагины для JQuery)
    - button (фильтрация контента или табы)
    - countdown (обратный отсчет до даты)
    - field (валидация полей, функционал для range slider)
    - form (валидация полей в форме, отправка данных с формы)
    - lazy (ленивая загрузка изображений и контента, прелоадер)
    - modal (модальные окна)
    - slider (инициализация слайдера и доп.функционал к нему)
    - untils (дополнительные классы, такие как addClassTimeout и ajaxPost)

### Работа с директориями
Все файлы собираются в папку **dist**. Изображения собираются со всех директорий и перемещаются в корень **dist/assets/img**, без разбития на директории.

```
fonts/ (шрифты)
|- ...

data/ (различные файлы)
|- ...

blocks/ (директория для блоков, содержит pug/html/php/lead/scss/js/img)
|- global/ (глобальные файлы на весь сайт)
|- **/* (кастомные блоки создаваемые пользователем)
|- blocks.js (для подключения скриптов блоков)
|- blocks.scss (для подключения стилей блоков)
|- ...

components/ (директория для компонентов стартового пакета, содержит pug/html/php/lead/scss/js/img)
|- global/ (глобальные файлы на весь сайт)
|- **/* (список всех компонентов приведен выше)
|- components.js (для подключения скриптов компонентов)
|- components.scss (для подключения стилей компонентов)
|- ...

pages/
|- *.pug, *.html, *.leaf, *.php (файлы страниц)
|- ...
```

Все блоки размещаются в директории **blocks**, где имя папки - это имя блока. Директория блока содержит в себе разметку, скрипты, стили и изображения этого блока.

### Создание новых блоков
Для автоматического создания файлов блоков, можно воспользоваться командой _node hydra block ИМЯ_. Данная команда создаст заготовки блока pug/scss/js.

### Структура верстки на PUG
Пример верстки с отступами и наименованием.

```
//
// Заголовок сайта
//

header.header
    div.column-six
        // Навигация по сайту
        menu.header-menu
            a.header-menu__link(href='#') Главная страница
            a.header-menu__link(href='#') Новости
    div.column-six
        // Контакты
        div.contacts
            a.contacts__phone(href='tel:+79991112233') +7 (999) 111-22-33
            a.contacts__email(href='mailto:im@alekseypleshkov.ru') im@alekseypleshkov.ru

//
// Главный блок новостей. Слайдер
//

div.slider
    ...
```

### Именование переменных и классов в SCSS
Именование переменных и классов в стилях происходит по принципу методологии [**БЭМ**](https://ru.bem.info/methodology/key-concepts/). Разбитие на логические блоки и файлы. Пример:

**Переменные в SCSS**
```
$имя блока__тип стиля--состояние: параметр;
$news-header__bg--normal: #000;
$news-body__border-color--active: #fff;
```

**Стили в PUG/HTML** _(подробнее на оф.сайте БЭМ)_
```
.блок__элемент--модификатор

.header {
    &__menu {
        color: #000;

        &--active {
            text-decoration: underline;
        }
    }
}
```

#### Вертикальный ритм
В качестве базового вертикального размера используется вертикальный ритм. Его значение варьируется в зависимости от проекта, но в рамках проекта он имеет одно значение (например, 4px, 8px, 12px и так далее) и задается переменной _$vg_ в секции сетки файла **_variables.scss**. Это базовый вертикальный размер для свойств (padding, margin, height) всех компонентов, размер которых задается через значение:

```
// variables.scss
$vg: rem(6);

// header.scss
.header {
    padding: ($vg * множитель) rem(10);
}
```

Значения для свойств задается не в px, а в rem. Задаются эти значения не вручную, а с помощью функции rem().

```
.header {
    width: rem(600);
}
```

### Именование переменных функций в ES6
Соблюдение правил, установленных eslint. Основная задача передать смысл переменных и классов по названию. Разбитие на логические блоки и файлы. JQuery переменные обозначаются в начале имени символом **$**.

```
//
// Навигация по сайту
//

let $header = $('.header');
let $headerMenu = header.find('.menu');

// Добавляем классы анимаций к элементу меню
function animateActiveMenu(menuClick) {
    ...
    menuClick.addClass('animated pulse');
}

// Обработчик клика по элементу меню
headerMenu.click(function () {
    let $th = $(this);
    animateActiveMenu($th);
});
...
```

Используем табуляцию (равную 4 пробелам) и соблюдаем по 1 отступу между функциями и блочными комментариями.

### Рефакторинг после окончания работ
После завершения работ с кодом, требуется проводить рефакторинг кода (любой IDE). SCSS прогонять через csscomb, который есть в зависимостях стартового пакета _(терминал: csscomb ./src/blocks)_

### Автообновление стартового пакета
Для автоматического обновления стартового пакета до последней версии нужно воспользоваться командой _node hydra update master_ для выкачивания стабильной версии или _node hydra update develop_ для версии в разработке.