import { Tetromino } from './tetromino.abstract';
import { BlockPosition } from '../../types/tetromino';
import { TetrominoId, tetrominoOInitialPosition } from '../../constants/tetrominos.constants';

export class TetrominoO extends Tetromino {
  protected tetrominoBlockPositions: BlockPosition[][];

  public tetrominoId: number = TetrominoId.O;

  constructor() {
    super(tetrominoOInitialPosition);

    this.tetrominoBlockPositions = [
      [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
      ],
      [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
      ],
      [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
      ],
      [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 },
      ],
    ];
  }
}
