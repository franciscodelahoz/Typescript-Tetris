import { Tetromino } from './components/tetrominos/tetromino.abstract';
import { TetrominoJ } from './components/tetrominos/tetromino-J';
import { TetrominoI } from './components/tetrominos/tetromino-I';
import { TetrominoL } from './components/tetrominos/tetromino-L';
import { TetrominoO } from './components/tetrominos/tetromino-O';
import { TetrominoS } from './components/tetrominos/tetromino-S';
import { TetrominoZ } from './components/tetrominos/tetromino-Z';
import { TetrominoT } from './components/tetrominos/tetromino-T';

export class TetrominoQueue {
  private tetrominoList: Tetromino[] = [
    new TetrominoI(),
    new TetrominoJ(),
    new TetrominoL(),
    new TetrominoO(),
    new TetrominoS(),
    new TetrominoT(),
    new TetrominoZ(),
  ];

  private usedTetrominoList: Tetromino[] = [];

  public currentTetromino: Tetromino;

  constructor() {
    this.currentTetromino = this.generateRandomTetromino();
  }

  private stackTetrominoList(): void {
    this.tetrominoList.push(...this.usedTetrominoList);
    this.usedTetrominoList = [];
  }

  private generateRandomTetromino(): Tetromino {
    if (this.tetrominoList.length === 0) {
      this.stackTetrominoList();
    }

    const index = Math.floor(Math.random() * this.tetrominoList.length);

    const tetromino = this.tetrominoList.splice(index, 1)[0];
    this.usedTetrominoList.push(tetromino);

    return tetromino;
  }

  public getNextTetromino(): Tetromino {
    const nextTetrominoInQueue = this.currentTetromino;
    this.currentTetromino = this.generateRandomTetromino();
    return nextTetrominoInQueue;
  }

  public resetQueue(): void {
    this.tetrominoList.push(...this.usedTetrominoList);
    this.usedTetrominoList = [];
    this.currentTetromino = this.generateRandomTetromino();
  }
}
