import { Tetromino } from './tetromino.abstract';
import { BlockPosition } from '../../types/tetromino';
import { TetrominoId, tetrominoTInitialPosition } from '../../constants/tetrominos.constants';

export class TetrominoT extends Tetromino {
  protected tetrominoBlockPositions: BlockPosition[][];

  public tetrominoId: number = TetrominoId.T;

  constructor() {
    super(tetrominoTInitialPosition);

    this.tetrominoBlockPositions = [
      [
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 1 },
      ],
      [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 2, column: 1 },
      ],
      [
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
      ],
    ];
  }
}
