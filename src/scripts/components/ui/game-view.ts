import {
  displayScale,
  gridColumns,
  gridRows
} from '../../constants/general.constants';
import { Display } from './display.abstract';

export class GameView extends Display {
  constructor(htmlCanvas: HTMLCanvasElement | null) {
    super(htmlCanvas, gridRows, gridColumns, displayScale);
    this.drawGrid();
  }

  calculateBlockPosition(row: number, column: number) {
    return {
      x: row * this.displayScale,
      y: column * this.displayScale,
    }
  }
}
