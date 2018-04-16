new Vue({
  el: '#exercise',

  data: {
    value: 0,
    duration: 5000
  },

  computed: {
    result: function () {
      return this.value < 37 ? "Not there yet ..." : "Done!"
    }
  },

  watch: {
    result: function (newValue) {
      // watches all changes, including the switch back to "Not there yet ..."
      // avoid an erroneous second reset by checking specific value
      if (newValue === "Done!") {
        setTimeout(function () {
          this.value = 0;
        }.bind(this), this.duration);
      }
    }
  }
});
