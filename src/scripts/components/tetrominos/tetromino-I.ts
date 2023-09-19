import { Tetromino } from './tetromino.abstract';
import { BlockPosition } from '../../types/tetromino';
import { TetrominoId, tetrominoIInitialPosition } from '../../constants/tetrominos.constants';

export class TetrominoI extends Tetromino {
  protected tetrominoBlockPositions: BlockPosition[][];

  public tetrominoId: number = TetrominoId.I;

  constructor() {
    super(tetrominoIInitialPosition);

    this.tetrominoBlockPositions = [
      [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 1, column: 3 },
      ],
      [
        { row: 0, column: 2 },
        { row: 1, column: 2 },
        { row: 2, column: 2 },
        { row: 3, column: 2 },
      ],
      [
        { row: 2, column: 0 },
        { row: 2, column: 1 },
        { row: 2, column: 2 },
        { row: 2, column: 3 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
        { row: 3, column: 1 },
      ],
    ];
  }
}
