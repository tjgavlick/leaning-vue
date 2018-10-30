new Vue({
  el: '#exercise',

  data: {
    value: 0
  },

  computed: {
    result: function () {
      return this.value === 37 ? "done" : "not there yet";
    }
  },

  watch: {
    result: function () {
      setTimeout(function () {
        this.value = 0;
      }.bind(this), 5000);
    }
  }
});
