new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    playersAttack: 0,
    monstersAttack: 0,
    turns: [],
    winMessage: ""
  },
  methods: {
    getMessage(player, type, whom, attack) {
      return player + " " + type + " " + whom + " for " + attack + " points";
    },
    startGame() {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
      this.winMessage = "";
    },
    attack() {
      this.playersAttack = this.calculateDamage(1, 10);
      this.monsterHealth -= this.playersAttack;
      this.turns.unshift({
        msg: this.getMessage("Player", "Hits", "Monster", this.playersAttack),
        player: true
      });
      if (this.checkIfWon()) {
        return;
      } else {
        this.monstersAttack = this.calculateDamage(1, 10);
        this.playerHealth -= this.monstersAttack;
        this.turns.unshift({
          msg: this.getMessage(
            "Monster",
            "Hits",
            "Player",
            this.monstersAttack
          ),
          player: false
        });
        this.checkIfWon();
      }
    },
    specialAttack() {
      this.playersAttack = this.calculateDamage(10, 20);
      this.monsterHealth -= this.playersAttack;
      this.turns.unshift({
        msg: this.getMessage("Player", "Hits", "Monster", this.playersAttack),
        player: true
      });
      if (this.checkIfWon()) {
        return;
      } else {
        this.monstersAttack = this.calculateDamage(10, 20);
        this.playerHealth -= this.monstersAttack;
        this.turns.unshift({
          msg: this.getMessage(
            "Monster",
            "Hits",
            "Player",
            this.monstersAttack
          ),
          player: false
        });
        this.checkIfWon();
      }
    },

    heal() {
      this.playersAttack = Math.floor(Math.random() * 11);
      this.playerHealth += this.playersAttack;
      this.turns.unshift({
        msg: this.getMessage("Player", "Heals", "Himself", this.playersAttack),
        player: true
      });

      this.monstersAttack = this.calculateDamage(1, 10);
      this.playerHealth -= this.monstersAttack;
      this.turns.unshift({
        msg: this.getMessage("Monster", "Hits", "Player", this.monstersAttack),
        player: false
      });
      this.checkIfWon();
    },
    reset() {
      this.gameIsRunning = false;
    },
    calculateDamage(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkIfWon() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.gameIsRunning = false;
        this.winMessage = "You won!";
        return true;
      } else if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this.gameIsRunning = false;
        this.winMessage = "You lost :(";
        return true;
      }
      return false;
    }
  }
});
