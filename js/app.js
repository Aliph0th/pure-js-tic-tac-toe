'use strict';

const MAX_NEW_PLAYERS = 3;
const EMPTY_CELL = 0;
const formElement = document.getElementById('pre_settings');
let gameController;

const settingsController = new SettingsController();
settingsController.listenAddPlayers();

formElement.addEventListener('submit', e => {
   e.preventDefault();
   formElement.classList.add('hidden');

   gameController = new GameController(
      settingsController.size,
      settingsController.rule,
      ['❌', '⭕', ...settingsController.usedPlayerChars]
   );
   gameController.startGame();
});

document.getElementById('restart').addEventListener('click', () => {
   gameController.unmount();
   gameController = null;
   settingsController.restart();
});
