import { Tetromino } from './tetromino.abstract';
import { BlockPosition } from '../../types/tetromino';
import { TetrominoId, tetrominoJInitialPosition } from '../../constants/tetrominos.constants';

export class TetrominoJ extends Tetromino {
  protected tetrominoBlockPositions: BlockPosition[][];

  public tetrominoId: number = TetrominoId.J;

  constructor() {
    super(tetrominoJInitialPosition);

    this.tetrominoBlockPositions = [
      [
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
        { row: 2, column: 2 },
      ],
      [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 2 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
        { row: 2, column: 1 },
      ],
    ];
  }
}
