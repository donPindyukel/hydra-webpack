// ==========================================================================
// Глобальные скрипты
// ==========================================================================

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

// Test flow
// @flow
function concat(a: string, b: string) {
  return a + b;
}
concat("A", "B"); // Works!
concat(1, 2); // Error!