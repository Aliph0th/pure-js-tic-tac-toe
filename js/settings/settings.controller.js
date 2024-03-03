'use strict';

class SettingsController {
   #playerChars = ['🤣', '💘', '🌚', '🐧', '👨‍✈️', '👦', '🌞', '👊', '🎸'].sort(
      () => 0.5 - Math.random()
   );
   #model = new SettingsModel();
   #newPlayerCount = 0;

   constructor() {
      this.usedPlayerChars = [];
   }

   listenAddPlayers() {
      document
         .getElementById('add_player')
         .addEventListener('click', this.#addPlayer.bind(this));
   }

   #addPlayer() {
      if (this.#newPlayerCount > MAX_NEW_PLAYERS) {
         return;
      }

      const randomID = Math.floor(Math.random() * this.#playerChars.length);
      const playerChar = this.#playerChars.splice(randomID, 1)[0];
      this.usedPlayerChars.push(playerChar);

      this.#model.renderNewPlayer(
         this.#newPlayerCount,
         playerChar,
         this.#removePlayer.bind(this)
      );

      this.#newPlayerCount++;
      if (this.#newPlayerCount === MAX_NEW_PLAYERS) {
         this.#model.disableAddPlayerBtn();
      } else if (this.#newPlayerCount > 0) {
         this.#model.hideNoPlayersText();
      }
   }

   #removePlayer(player) {
      const id = +player.dataset.id;
      this.#playerChars.push(this.usedPlayerChars.splice(id, 1)[0]);
      player.remove();
      if (--this.#newPlayerCount <= MAX_NEW_PLAYERS) {
         this.#model.enableAddPlayerBtn();
         if (!this.#newPlayerCount) {
            this.#model.showNoPlayersText();
         }
      }
   }
}
