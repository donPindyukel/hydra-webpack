// ==========================================================================
// Компонент формы
// ==========================================================================

/**
 * Отправка GET запроса ajax
 * @param url Ссылка для отправки запроса
 * @param func Функция для возвращения результата отправки
 */
function ajaxGet(url, func) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.open('GET', url);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.onload = function () {
    func(httpRequest.responseText, httpRequest.status);
  };
  httpRequest.send();
}

/**
 * Отправка POST запроса ajax
 * @param form Для возвращения объекта формы в callback
 * @param url Ссылка для отправки запроса
 * @param params Передаваемые параметры на страницу
 * @param func Функция для возвращения результата отправки
 */
function ajaxPost(form, url, params, func) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.open('POST', url);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.onload = function () {
    func(form, httpRequest.responseText, httpRequest.status);
  };
  httpRequest.send(encodeURI(params));
}

(function ($) {
  /**
   * Создание range slider
   * @returns {boolean}
   * @param dataMin Атрибут минимального значения
   * @param dataMax Атрибут максимального значения
   */
  $.fn.fieldInitRangeSlider = function (dataMin, dataMax) {
    let th = this;
    let min = th.data(dataMin);
    let max = th.data(dataMax);

    th.append('<span class="range-pointer"></span>');
    th.append(`<input type="hidden" class="range-value" value="${dataMin}">`);
    let pointer = th.find('.range-pointer');
    let value = th.find('.range-value');
    let isMoviePointer = false;

    // Функция смены положения поинтера и записи value
    function pointerMovie(e) {
      // Вычисление положения ползунка
      let offsetLeft = th.offset().left;
      let left = e.pageX - offsetLeft - pointer.width() / 2;
      let maxWidth = th.width(); //  offsetLeft;

      // Калькулирование значения текстового поля
      let calc = Math.round(left * max / th.width());

      // Позиционирование поинтера
      pointer.css('left', `${left}px`);

      // Не отпускаем за максимальное и минимальное значения
      if (left < 0) {
        pointer.css('left', '0px');
      }
      if (left >= maxWidth) {
        pointer.css('left', `${maxWidth}px`);
      }

      if (calc < min) {
        calc = min;
      }
      if (calc > max) {
        calc = max;
      }
      value.val(calc);
    }

    // Кликаем на область слайдера и туда переносим поинтер
    th.mousedown((e) => {
      pointerMovie(e);
    });

    // Акцивация движения ползунка при клике
    pointer.mousedown(() => {
      isMoviePointer = true;
    });

    // Елси клик больше не нажат, отключаем движение
    pointer.mouseup(() => {
      isMoviePointer = false;
    });

    // Если покинули зону ползунка, отключаем движение
    th.mouseleave(() => {
      isMoviePointer = false;
    });

    // Движение поинтера за мышью
    th.bind('mousemove', (e) => {
      if (isMoviePointer) {
        pointerMovie(e);
      }
    });
  };

  /**
   * Проверка поля на прохождение валидации
   * @param dataParamsName Имя атрибута с которого брать числовое значение для валидации
   * @returns {boolean}
   */
  $.fn.fieldValidate = function (dataParamsName) {
    if (this.attr('type')) {
      // Текстовое поле по длине строки
      if (this.attr('type') === 'text' || this.attr('type') === 'number' ||
        this.attr('type') === 'tel' || this.attr('type') === 'password' ||
        this.attr('type') === 'email') {
        let dataValid = parseInt(this.data(dataParamsName));

        return this.val().length >= dataValid;
      }

      // Радио или чекбокс по checked
      if (this.attr('type') === 'radio' || this.attr('type') === 'checkbox') {
        let dataValid = Boolean(this.data(dataParamsName));

        return this.prop('checked') === dataValid;
      }

      return true;
    }
  };

  /**
   * Подствечивание валидации полей при изменении их значения
   * @param successClass Имя класса, для присвоения при успешной валидации
   * @param errorClass Имя класса, для присвоения при провальной валидации
   * @param removeClassTimeout Время, через которое удалить эти классы
   * @param dataParamsName Имя атрибута с которого брать числовое значение для валидации
   */
  $.fn.fieldEventValidate = function (successClass, errorClass, removeClassTimeout, dataParamsName) {
    this.change(function () {
      let th = $(this);

      if (th.fieldValidate(dataParamsName)) {
        th.addClass(successClass);
      } else {
        th.addClass(errorClass);
      }

      setTimeout(() => {
        th.removeClass(successClass);
        th.removeClass(errorClass);
      }, removeClassTimeout);
    });
  };

  /**
   * Отправка данных с формы
   * @param func Выполняемая функция после отправки данных
   * @param stopIsNotValidate Валидация формы true/false
   * @param dataParamsName Имя дата-атрибута, с которого брать число/true/false для проверки валидации.
   * @param activeAntiSpam Включить проверку на спам. Добавляем скрытое поле в форму для отправки на скрипт.
   * @param antiSpamHashKey Содержимое скрытого поля для антиспам системы, проверяется на бэкэнде.
   */
  $.fn.formAjax = function (func, stopIsNotValidate = false, dataParamsName = 'valid', activeAntiSpam = false, antiSpamHashKey = 'success') {
    let th = this;

    // Защита от спама
    if (activeAntiSpam) {
      setTimeout(() => {
        th.append(`<input type="hidden" name="hash" class="hash" value="${antiSpamHashKey}">`);
      }, 1000);
    }

    // Отлавливаем событие нажатия на сабмит
    this.on('submit', function (e) {
      let form = $(this);

      e.preventDefault();
      if (!stopIsNotValidate) {
        ajaxPost(form, form.attr('action'), form.serialize(), func);
      } else {
        let error = 0;

        form.find('input').each(function () {
          let field = $(this);

          if (!field.fieldValidate()) {
            error += 1;
            field.change();
          }
        });
        if (error === 0) {
          ajaxPost(form, form.attr('action'), form.serialize(), func);
        }
      }

      return false;
    });
  };
})(jQuery);
