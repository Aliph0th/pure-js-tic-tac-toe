'use strict';

class SettingsModel {
   #noPlayersElement = document.getElementById('no_additional_players');
   #addPlayerBtn = document.getElementById('add_player');

   renderNewPlayer(id, char, removeCallback) {
      const span = this.#createElement({
         type: 'span',
         innerHTML: `Символ игрока: ${char}`,
         classes: ['player_char']
      });

      const button = this.#createElement({
         type: 'button',
         innerHTML: '&times;',
         classes: ['btn', 'btn_red'],
         attributes: { type: 'button' },
         listeners: { click: () => removeCallback(button.parentElement) }
      });

      const newPlayer = this.#createElement({
         type: 'div',
         classes: ['additional_player'],
         children: [span, button],
         listeners: { 'data-id': id }
      });

      this.#addPlayerBtn.parentElement.insertBefore(
         newPlayer,
         this.#addPlayerBtn
      );
   }

   #createElement({
      type,
      innerHTML = '',
      classes = [],
      children = [],
      attributes = {},
      listeners = {}
   }) {
      const element = document.createElement(type);
      element.classList.add(...classes);
      element.innerHTML = innerHTML;
      children.forEach(child => element.appendChild(child));
      Object.entries(attributes).forEach(([key, value]) =>
         element.setAttribute(key, value)
      );
      Object.entries(listeners).forEach(([key, value]) =>
         element.addEventListener(key, value)
      );

      return element;
   }

   disableAddPlayerBtn() {
      this.#addPlayerBtn.setAttribute('disabled', true);
   }
   enableAddPlayerBtn() {
      this.#addPlayerBtn.removeAttribute('disabled');
   }

   hideNoPlayersText() {
      this.#noPlayersElement.classList.add('hidden');
   }
   showNoPlayersText() {
      this.#noPlayersElement.classList.remove('hidden');
   }
}
