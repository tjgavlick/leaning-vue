new Vue({
  el: '#exercise',

  data: {
    value: ''
  },

  methods: {
    showAlert: function (ev) {
      alert(ev.target.textContent);
    },

    updateValue: function (ev) {
      this.value = ev.target.value;
    }
  }
});
