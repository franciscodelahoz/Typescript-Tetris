import {
  displayScale,
  nextTetrominoViewColumns,
  nextTetrominoViewRows
} from '../../constants/general.constants';
import { Display } from './display.abstract';

export class NextTetrominoView extends Display {
  constructor(htmlCanvas: HTMLCanvasElement | null) {
    super(htmlCanvas, nextTetrominoViewRows, nextTetrominoViewColumns, displayScale);
  }

  calculateBlockPosition(row: number, column: number) {
    return {
      x: row,
      y: column,
    }
  }
}
