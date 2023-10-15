import { BlockPosition } from '../types/tetromino';

export const tetrominoIInitialPosition: BlockPosition = { row: -2, column: 3 };

export const tetrominoJInitialPosition: BlockPosition = { row: -1, column: 3 };

export const tetrominoLInitialPosition: BlockPosition = { row: -1, column: 3 };

export const tetrominoOInitialPosition: BlockPosition = { row: -1, column: 4 };

export const tetrominoSInitialPosition: BlockPosition = { row: -1, column: 3 };

export const tetrominoTInitialPosition: BlockPosition = { row: -1, column: 3 };

export const tetrominoZInitialPosition: BlockPosition = { row: -1, column: 3 };

export enum TetrominoId {
  I = 1,
  J = 2,
  L = 3,
  O = 4,
  S = 5,
  T = 6,
  Z = 7,
}
