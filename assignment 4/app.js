new Vue({
  el: '#exercise',

  data: {
    interval: null,
    effectClass: '',
    firstClass: 'foo',
    secondClass: 'highlight',
    thirdClassIsAttached: 'false',
    styles: 'height: 100px; background: #838;',
    progress: ''
  },

  methods: {
    startEffect: function (ev) {
      this.interval = setInterval(function () {
        this.effectClass = this.effectClass === 'highlight' ? 'shrink' : 'highlight';
      }.bind(this), 500);
    },

    stopEffect: function (ev) {
      clearInterval(this.interval);
      this.effectClass = '';
    },

    startProgress: function (ev) {
      this.progress = 'is-done';
    }
  },

  computed: {
    thirdClass: function () {
      return this.thirdClassIsAttached === 'true' ? 'third' : '';
    }
  }
});
