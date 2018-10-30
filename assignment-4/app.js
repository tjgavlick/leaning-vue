new Vue({
  el: '#exercise',

  data: {
    class1: 'highlight',
    class2: 'foo',
    class3: 'bar',
    userClasses: '',
    hasBorder: 'false',
    progress: 0
  },

  computed: {
    boolHasBorder: function () {
      return this.hasBorder === 'true';
    }
  },

  methods: {
    startEffect: function() {
      setInterval(function () {
        this.class1 = this.class1 === 'highlight' ? 'shrink' : 'highlight';
      }.bind(this), 500);
    },

    startProgress: function () {
      var interval = setInterval(function () {
        this.progress++;
        if (this.progress >= 100) {
          clearInterval(interval);
        }
      }.bind(this), 16.67);
    }
  }
});
