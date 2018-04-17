'use strict';

const _actions = {
  attack: {
    verb: 'attacked'
  },
  special: {
    verb: 'cast a special attack on'
  },
  heal: {
    verb: 'healed'
  },
  run: {
    verb: 'ran'
  },
  die: {
    verb: 'died'
  }
};

var vue = new Vue({
  el: '#app',

  data: {
    isPlaying: false,
    isWaiting: false,
    cpuDelay: 1000,

    players: [
      {
        name: 'Player 1',
        hp: 100,
        message: '',
        specialCooldown: 0
      },
      {
        name: 'Scary Monster',
        hp: 100,
        message: '',
        specialCooldown: 0
      }
    ],

    log: []
  },

  methods: {
    resetGame: function () {
      for (let player of this.players) {
        player.hp = 100;
        player.message = '';
        player.specialCooldown = 0;
      }
      this.log.length = 0;
    },

    startGame: function () {
      this.resetGame();
      this.isPlaying = true;
    },

    endGame: function (result) {
      this.resetGame();
      this.isPlaying = false;
    },

    logAction: function (action, source, magnitude, target) {
      const now = new Date();
      var description = [],
          disposition = 'neutral';

      // assemble description
      if (this.players[source]) {
        description.push(this.players[source].name);
      }
      description.push(action.verb);
      if (this.players[target]) {
        description.push(this.players[target].name);
      }
      if (magnitude) {
        if (this.players[target]) {
          description.push('for');
        }
        description.push(magnitude + ' damage');
      }

      // tweak disposition
      // monster attacks player
      if ((action === _actions.attack || action === _actions.special) && source === 1) {
        disposition = 'negative';

      // player heals
      } else if (action === _actions.heal && source === 0) {
        disposition = 'positive';

      // player casts a special attack
      } else if (action === _actions.special) {
        disposition = 'mystical';

      // player dies
      } else if (action === _actions.die && source === 0) {
        disposition = 'negative';

      // monster dies
      } else if (action === _actions.die && source === 1) {
        disposition = 'positive';
      }

      this.log.push({
        timestamp: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
        disposition: disposition,
        text: description.join(' ') + (action === _actions.die ? '!' : '.')
      });
    },

    respondToPlayerAction: function () {
      // monster can attack, special attack, heal
      // but don't heal if at max health
      let action = Math.random();
      this.isWaiting = true;
      setTimeout(function () {
        this.isWaiting = false;
        if (this.isPlaying) {
          if (action < 0.1 && this.players[1].specialCooldown === 0) {
            this.specialAttack(1, 0);
          } else if (action > 0.8 && this.players[1].hp < 100) {
            this.heal(1);
          } else {
            this.attack(1, 0);
          }

          // ability cooldowns
          for (let player of this.players) {
            if (player.specialCooldown > 0) {
              player.specialCooldown--;
            }
          }
        }
      }.bind(this), this.cpuDelay);
    },

    attack: function (source, target) {
      var sourcePlayer = this.players[source],
          targetPlayer = this.players[target],
          damage;

      // player damage is different from monster damage
      if (source === 0) {
        damage = Math.floor(Math.random() * 6 + 5);  // between 5 and 10
      } else {
        damage = Math.floor(Math.random() * 14 + 5);  // between 5 and 18
      }

      targetPlayer.hp -= damage;

      this.logAction(_actions.attack, source, damage, target);

      if (source === 0) {
        this.respondToPlayerAction();
      }
    },

    specialAttack: function (source, target) {
      var sourcePlayer = this.players[source],
          targetPlayer = this.players[target],
          damage = Math.floor(Math.random() * 40 + 3);  // between 3 and 42

      targetPlayer.hp -= damage;
      sourcePlayer.specialCooldown = 3;

      this.logAction(_actions.special, source, damage, target);

      if (source === 0) {
        this.respondToPlayerAction();
      }
    },

    heal: function (source) {
      var sourcePlayer = this.players[source],
          amount = Math.floor(Math.random() * 10 + 5);

      sourcePlayer.hp += amount;

      this.logAction(_actions.heal, source, amount);

      if (source === 0) {
        this.respondToPlayerAction();
      }
    }
  },

  watch: {
    players: {
      handler: function (players) {
        for (let i = 0; i < players.length; i++) {
          let player = players[i];
          // detect a loss
          if (player.hp <= 0) {
            this.logAction(_actions.die, i);
            this.isPlaying = false;
            break;
          }
          // make sure nobody goes above max hp
          if (player.hp > 100) {
            player.hp = 100;
          }
        }
      },
      deep: true
    }
  }
});
