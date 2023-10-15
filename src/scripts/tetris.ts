import { GameController } from './game-controller';
import {
  MovementDirection,
  gameOverMessage,
  gridColumns,
  gridRows
} from './constants/general.constants';
import { Grid } from './grid';
import { TetrominoQueue } from './tetromino-queue';
import { GameView } from './components/ui/game-view';
import { NextTetrominoView } from './components/ui/next-tetromino-view';
import { Score } from './components/ui/score';

export class Tetris {
  private gameController: GameController;

  constructor(
    gameViewCanvas: HTMLCanvasElement | null,
    nextTetrominoViewCanvas: HTMLCanvasElement | null,
    scoreIndicator: HTMLElement | null
  ) {
    const gameView = new GameView(gameViewCanvas);
    const tetrominoQueue = new TetrominoQueue();
    const grid = new Grid(gridRows, gridColumns);
    const nextTetrominoView = new NextTetrominoView(nextTetrominoViewCanvas);
    const score = new Score(scoreIndicator);

    this.gameController = new GameController(grid, tetrominoQueue, gameView, nextTetrominoView, score);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (this.gameController.isGameOver) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        this.gameController.moveTetrominoToDirection(MovementDirection.LEFT);
        break;
      case 'ArrowRight':
        this.gameController.moveTetrominoToDirection(MovementDirection.RIGHT);
        break;
      case 'ArrowDown':
        this.gameController.moveTetrominoToDirection(MovementDirection.DOWN);
        break;
      case 'ArrowUp':
        this.gameController.rotateTetromino(true);
        break;
      case 'z':
        this.gameController.rotateTetromino(false);
        break;
      case 'x':
        this.gameController.hardMoveTetrominoToBottom();
        break;
      default: break;
    }

    this.gameController.render();
  }

  public gameLoop(): void {
    if (this.gameController.isGameOver) {
      if (window.confirm(gameOverMessage)) {
        this.resetGame();
      }

      return;
    }

    this.gameController.moveTetrominoToDirection(MovementDirection.DOWN);
    this.gameController.render();

    setTimeout(() => {
      this.gameLoop();
    }, 500);
  }

  public startGame(): void {
    this.gameLoop();
  }

  public resetGame(): void {
    this.gameController.resetGame();
    this.gameLoop();
  }
}
