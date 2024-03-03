'use strict';

const MAX_NEW_PLAYERS = 3;
const EMPTY_CELL = 0;

const settingsController = new SettingsController();
settingsController.listenAddPlayers();

document.getElementById('pre_settings').addEventListener('submit', e => {
   e.preventDefault();

   this.size = +document.getElementById('size').value;
   this.rule = +document.getElementById('rules').value;
   this.players = ['❌', '⭕', ...settingsController.usedPlayerChars];

   const gameController = new GameController(size, rule, players);
   gameController.startGame();
});
