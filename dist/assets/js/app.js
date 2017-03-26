"use strict";function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function el(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"element",n=[],a=Element;if("button"===e?a=ElButton:"field"===e?a=ElField:"form"===e?a=ElForm:"modal"===e&&(a=ElModal),"string"==typeof t)for(var o=document.querySelectorAll(t),i=0;i<o.length;i++)n.push(new a(o[i]));else if("object"===(void 0===t?"undefined":_typeof(t))&&t.length>0)for(var l=t,r=0;r<l.length;r++)n.push(new a(l[r]));return n}function log(t){console.log(t)}function ajaxGet(t,e){var n=new XMLHttpRequest;n.open("GET",t),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onload=function(){e(n.responseText,n.status)},n.send()}function ajaxPost(t,e,n){var a=new XMLHttpRequest;a.open("POST",t),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.onload=function(){n(a.responseText,a.status)},a.send(encodeURI(e))}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,n,a){return n&&t(e.prototype,n),a&&t(e,a),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},globalHideClass="hide",fieldValidType="length",fieldValidDataName="valid",fieldValidSuccessClass="validate-success",fieldValidErrorClass="validate-error",fieldValidRemoveClassTimeout=1e3,formStopIsNotValidate=!0,buttonFilterDataTargetName="target",buttonFilterDataActorName="actor",modalAnimateClassShow="fadeIn",modalAnimateClassHide="fadeOut",modalAnimateDeleteTimeout=1e3,Element=function(){function t(e){return _classCallCheck(this,t),this.name=null,this.actor=null,"string"==typeof e?(this.name=e,this.actor=document.querySelector(e)):"object"===(void 0===e?"undefined":_typeof(e))&&(this.actor=e),this}return _createClass(t,[{key:"addClass",value:function(t){return this.actor.classList.add(t),this}},{key:"removeClass",value:function(t){return this.actor.classList.remove(t),this}},{key:"addClassTimeout",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=this;return setTimeout(function(){n.addClass(t)},e),this}},{key:"removeClassTimeout",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=this;return setTimeout(function(){n.removeClass(t)},e),this}},{key:"hasClass",value:function(t){return el.actor.classList.forEach(function(e){if(e===t)return!0}),!1}},{key:"attr",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return null!==e&&this.actor.setAttribute(t,e),this.actor.getAttribute(t)}},{key:"data",value:function(t){return this.actor.getAttribute("data-"+t)}},{key:"hasData",value:function(t){return null!==this.data(t)}},{key:"find",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"elements";return null!==this.name?el(this.name+" "+t,e):el(this.actor.querySelectorAll(t),e)}},{key:"html",value:function(t){return this.actor.innerHTML=t,this}}]),t}(),ElModal=function(t){function e(t){var n;_classCallCheck(this,e);var a=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n=a,_possibleConstructorReturn(a,n)}return _inherits(e,t),_createClass(e,[{key:"show",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:modalAnimateClassShow,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:modalAnimateDeleteTimeout;null!==t&&(this.addClass(t),this.removeClassTimeout(t,e)),this.addClass("show")}},{key:"hide",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:modalAnimateClassHide,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:modalAnimateDeleteTimeout;if(null!==t){this.addClass(t),this.removeClassTimeout(t,e);var n=this;setTimeout(function(){n.removeClass("show")},e)}else this.removeClass("show")}}]),e}(Element),ElButton=function(t){function e(t){var n;_classCallCheck(this,e);var a=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n=a,_possibleConstructorReturn(a,n)}return _inherits(e,t),_createClass(e,[{key:"eventClick",value:function(t){var e=this;return this.actor.addEventListener("click",function(){t(e)}),this}},{key:"filter",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:buttonFilterDataTargetName,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:buttonFilterDataActorName,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:globalHideClass,o=el(t);this.eventClick(function(t){o.forEach(function(o){o.addClass(a),t.hasData(e)&&o.hasData(n)&&t.data(e)===o.data(n)&&o.removeClass(a)})},!0)}}]),e}(Element),ElForm=function(t){function e(t){var n;_classCallCheck(this,e);var a=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return a.formFields=a.loadFields(),n=a,_possibleConstructorReturn(a,n)}return _inherits(e,t),_createClass(e,[{key:"loadFields",value:function(){var t=[];return this.find("input","field").forEach(function(e){t.push(e)}),this.find("input","field").forEach(function(e){t.push(e)}),t}},{key:"serialize",value:function(){var t="",e=1,n=this.formFields.length;return this.formFields.forEach(function(a){"submit"!==a.attr("type")&&(t+=a.attr("name")+"="+a.val(),e<n&&(t+="&")),e++}),t}},{key:"eventSubmit",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:formStopIsNotValidate,a=this;this.actor.addEventListener("submit",function(o){if(o.preventDefault(),n){var i=0;e.formFields.forEach(function(t){t.validate()||i++}),0===i&&ajaxPost(a.attr("action"),a.serialize(),t)}else ajaxPost(a.attr("action"),a.serialize(),t);return!1})}}]),e}(Element),ElField=function(t){function e(t){var n;_classCallCheck(this,e);var a=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return a.formFields=[],n=a,_possibleConstructorReturn(a,n)}return _inherits(e,t),_createClass(e,[{key:"val",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==t&&(this.actor.value=t),this.actor.value}},{key:"checked",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==t&&(this.actor.checked=t),this.actor.checked}},{key:"validate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fieldValidType,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:fieldValidDataName;if("length"===t){var n=parseInt(this.data(e));return this.val().length>=n}if("checked"===t){var a=Boolean(this.data(e));return this.checked()===a}}},{key:"eventChange",value:function(t){var e=this;return this.actor.addEventListener("change",function(){t(e)}),this}},{key:"eventValidate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fieldValidSuccessClass,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:fieldValidErrorClass,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:fieldValidRemoveClassTimeout,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:fieldValidType,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:fieldValidDataName;return this.eventChange(function(i){i.validate(a,o)?(i.addClass(t),null!==n&&i.removeClassTimeout(t,n)):(i.addClass(e),null!==n&&i.removeClassTimeout(e,n))}),this}}]),e}(Element);