'use strict';

class GameModel {
   #fieldElement = document.getElementById('field');
   #containerElement = document.getElementById('container');
   #formElement = document.getElementById('pre_settings');
   #infoElement = document.getElementById('info');
   #cells = [];
   #activeCell = null;

   showGameScreen() {
      this.#formElement.classList.add('hidden');
      this.#containerElement.classList.remove('hidden');
   }

   setInfoText(text) {
      this.#infoElement.innerText = text;
   }

   disableField() {
      this.#fieldElement.classList.add('finished');
   }

   activateCell([x, y]) {
      if (this.#activeCell) {
         this.deactivateCurrentCell();
      }
      this.#activeCell = this.#cells[x][y];
      this.#activeCell.classList.add('active');
   }
   deactivateCurrentCell() {
      this.#activeCell.classList.remove('active');
   }

   createField(field, size, callback) {
      this.#fieldElement.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
      field.forEach((row, x) => {
         const cellRow = [];
         row.forEach((_, y) => {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.addEventListener('click', () => callback(x, y));
            cellRow.push(newCell);
            this.#fieldElement.appendChild(newCell);
         });
         this.#cells.push(cellRow);
      });
   }

   putPlayerSymbol(x, y, char) {
      const cell = this.#cells[x][y];
      cell.innerText = char;
      cell.classList.add('occupied');
   }
}
