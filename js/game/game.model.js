'use strict';

class GameModel {
   #fieldElement = document.getElementById('field');
   #containerElement = document.getElementById('container');
   #infoElement = document.getElementById('info');
   #restartBtn = document.getElementById('restart');
   #cells = [];
   #activeCell = null;

   showGameScreen() {
      this.#containerElement.classList.remove('hidden');
   }
   hideGameScreen() {
      this.#containerElement.classList.add('hidden');
   }

   destroyAllCells() {
      this.#fieldElement.innerHTML = '';
   }

   showRestartBtn() {
      this.#restartBtn.classList.remove('hidden');
   }
   hideRestartBtn() {
      this.#restartBtn.classList.add('hidden');
   }

   setInfoText(text) {
      this.#infoElement.innerText = text;
   }

   disableField() {
      this.#fieldElement.classList.add('finished');
   }
   enableField() {
      this.#fieldElement.classList.remove('finished');
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
