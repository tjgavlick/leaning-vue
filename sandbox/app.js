'use strict';

var vue = new Vue({
  el: '#app',

  data: {
    title: 'Hello, world',
    link: 'https://google.com',
    anchor: '<a href="https://google.com">The Googs</a>'
  },

  methods: {
    sayHello: function () {
      this.title = "Goodbye";
      return this.title;
    }
  }
});
