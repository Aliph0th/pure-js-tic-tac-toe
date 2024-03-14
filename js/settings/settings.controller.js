'use strict';

class SettingsController {
   #playerChars = ['🤣', '💘', '🌚', '🐧', '👨‍✈️', '👦', '🌞', '👊', '🎸'].sort(
      () => 0.5 - Math.random()
   );
   #view = new SettingsView();
   #newPlayerCount = 0;

   constructor() {
      this.usedPlayerChars = [];
      this.size = 3;
      this.rule = 3;

      this.#view.sizeInput.addEventListener('input', this.#adjustValues.bind(this));
      this.#view.ruleInput.addEventListener('input', e => {
         this.rule = +e.target.value;
      });
   }

   listenAddPlayers() {
      document
         .getElementById('add_player')
         .addEventListener('click', this.#addPlayer.bind(this));
   }

   #adjustValues(e) {
      const value = +e.target.value;
      this.size = value;
      this.#view.ruleInput.setAttribute('max', value);
      if (this.rule > value && value > 0) {
         this.rule = value;
         this.#view.ruleInput.value = value;
      }
   }

   restart() {
      this.#view.showSettingsScreen();
   }

   #addPlayer() {
      if (this.#newPlayerCount > MAX_NEW_PLAYERS) {
         return;
      }

      const randomID = Math.floor(Math.random() * this.#playerChars.length);
      const playerChar = this.#playerChars.splice(randomID, 1)[0];
      this.usedPlayerChars.push(playerChar);

      this.#view.renderNewPlayer(
         this.#newPlayerCount,
         playerChar,
         this.#removePlayer.bind(this)
      );

      this.#newPlayerCount++;
      if (this.#newPlayerCount === MAX_NEW_PLAYERS) {
         this.#view.disableAddPlayerBtn();
      } else if (this.#newPlayerCount > 0) {
         this.#view.hideNoPlayersText();
      }
   }

   #removePlayer(player) {
      const id = +player.dataset.id;
      this.#playerChars.push(this.usedPlayerChars.splice(id, 1)[0]);
      player.remove();
      if (--this.#newPlayerCount <= MAX_NEW_PLAYERS) {
         this.#view.enableAddPlayerBtn();
         if (!this.#newPlayerCount) {
            this.#view.showNoPlayersText();
         }
      }
   }
}
