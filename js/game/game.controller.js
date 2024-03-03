'use strict';

class GameController {
   #model = new GameModel();
   #size;
   #rule;
   #players;
   #currentPlayer = 0;
   #moveIndex = 1;
   #occupiedCells = 0;
   #activeCell = [];
   #field;
   #isGameFinished = false;

   constructor(size, rule, players) {
      this.#size = size;
      this.#rule = rule;
      this.#players = players;
      this.#field = Array(size)
         .fill()
         .map(() => Array(size).fill(EMPTY_CELL));

      this.#model.setInfoText('Ход №1 Сейчас ходит ❌');

      document.addEventListener('keydown', this.#handleKeyDown.bind(this));
   }

   startGame() {
      this.#model.showGameScreen();
      this.#model.createField(
         this.#field,
         this.#size,
         this.#makeMove.bind(this)
      );
   }

   #handleKeyDown(e) {
      if (this.#isGameFinished) {
         return;
      }
      switch (e.code) {
         case 'ArrowLeft':
            this.#moveActiveCell(0, -1);
            break;
         case 'ArrowRight':
            this.#moveActiveCell(0, 1);
            break;
         case 'ArrowDown':
            this.#moveActiveCell(1, 0);
            break;
         case 'ArrowUp':
            this.#moveActiveCell(-1, 0);
            break;
         case 'Space':
         case 'Enter':
            this.#makeMove(...this.#activeCell);
            break;
      }
   }

   #moveActiveCell(dx, dy) {
      if (!this.#activeCell.length) {
         this.#activeCell = [0, 0];
      } else {
         this.#activeCell = [
            (this.#activeCell[0] + this.#size + dx) % this.#size,
            (this.#activeCell[1] + this.#size + dy) % this.#size
         ];
      }
      this.#model.activateCell(this.#activeCell);
   }

   #makeMove(x, y) {
      if (this.#isGameFinished) {
         return;
      }
      this.#activeCell = [x, y];
      this.#model.activateCell(this.#activeCell);

      if (this.#field[x][y] === EMPTY_CELL) {
         this.#field[x][y] = this.#currentPlayer + 1;
         this.#occupiedCells++;
         this.#model.putPlayerSymbol(x, y, this.#players[this.#currentPlayer]);
         if (this.#checkWin()) {
            this.#handleEndGame(
               `На ходу №${this.#moveIndex} победил ${
                  this.#players[this.#currentPlayer]
               }!`
            );
            return;
         } else if (this.#checkDraw()) {
            this.#handleEndGame(`На ходу №${this.#moveIndex} ничья!`);
            return;
         }
         this.#currentPlayer = (this.#currentPlayer + 1) % this.#players.length;
         this.#model.setInfoText(
            `Ход №${++this.#moveIndex} Сейчас ходит ${
               this.#players[this.#currentPlayer]
            }`
         );
      }
   }

   #handleEndGame(message) {
      this.#model.setInfoText(message);
      this.#model.disableField();
      this.#isGameFinished = true;
      this.#model.deactivateCurrentCell();
   }

   #checkDraw() {
      return this.#occupiedCells >= this.#size ** 2;
   }

   #checkWin() {
      // rows
      if (this.#field.some(row => this.#checkArrayForWinner(row))) {
         return true;
      }

      // columns
      if (
         this.#field.some((_, i) => {
            const column = this.#field.map(row => row[i]);
            return this.#checkArrayForWinner(column);
         })
      ) {
         return true;
      }

      // diagonals
      let isDiagonal = false;
      [...Array(this.#size - this.#rule + 1).keys()].forEach(i => {
         [...Array(this.#size - this.#rule + 1).keys()].forEach(j => {
            const diagonal1 = this.#field
               .slice(i, i + this.#rule)
               .map((row, index) => row[index + j]);
            const diagonal2 = this.#field
               .slice(i, i + this.#rule)
               .map((row, index) => row[this.#rule - 1 - index + j]);
            if (
               this.#checkArrayForWinner(diagonal1) ||
               this.#checkArrayForWinner(diagonal2)
            ) {
               isDiagonal = true;
            }
         });
      });

      return isDiagonal;
   }

   #checkArrayForWinner(array) {
      return new RegExp(
         `([1-${this.#players.length}])\\1{${this.#rule - 1}}`
      ).test(array.filter(Boolean).join(''));
   }
}
