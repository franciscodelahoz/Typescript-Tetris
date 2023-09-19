import './styles/style.css';

import { Tetris } from './scripts/tetris';

const canvas = document.getElementById('tetris-container') as HTMLCanvasElement;
const nextTetrominoView = document.getElementById('next-tetromino') as HTMLCanvasElement;
const scoreIndicator = document.getElementById('score') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  const tetris = new Tetris(canvas, nextTetrominoView, scoreIndicator);

  tetris.gameLoop();

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    tetris.onKeyPress(event);
  });
});
