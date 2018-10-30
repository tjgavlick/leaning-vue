new Vue({
  el: '#exercise',

  data: {
    value: ''
  },

  methods: {
    showAlert: function () {
      alert("aaaaa");
    },
    updateValue: function (ev) {
      this.value = ev.target.value;
    }
  }
});
