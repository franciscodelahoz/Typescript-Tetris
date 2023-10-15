import { BlockPosition } from '../../types/tetromino';

export abstract class Tetromino {
  protected abstract tetrominoBlockPositions: BlockPosition[][];

  private currentTetrominoPosition: BlockPosition;

  private initialTetrominoPosition: BlockPosition;

  private currentRotationIndex = 0;

  public abstract tetrominoId: number;

  constructor(initialTetrominoPosition: BlockPosition) {
    this.currentTetrominoPosition = { row: initialTetrominoPosition.row, column: initialTetrominoPosition.column };
    this.initialTetrominoPosition = { row: initialTetrominoPosition.row, column: initialTetrominoPosition.column };
  }

  public getCurrentBlocksPositions(): BlockPosition[] {
    const currentRotation = this.tetrominoBlockPositions[this.currentRotationIndex];

    return currentRotation.map((position) => {
      return {
        row: position.row + this.currentTetrominoPosition.row,
        column: position.column + this.currentTetrominoPosition.column
      }
    });
  }

  public rotateClockwise(): void {
    this.currentRotationIndex = (this.currentRotationIndex + 1) % this.tetrominoBlockPositions.length;
  }

  public rotateCounterClockwise(): void {
    if (this.currentRotationIndex === 0) {
      this.currentRotationIndex = this.tetrominoBlockPositions.length - 1;
    } else {
      this.currentRotationIndex = (this.currentRotationIndex - 1) % this.tetrominoBlockPositions.length;
    }
  }

  public move(rows: number, columns: number): void {
    this.currentTetrominoPosition.row += rows;
    this.currentTetrominoPosition.column += columns;
  }

  public resetPosition(): void {
    this.currentRotationIndex = 0;

    this.currentTetrominoPosition.row = this.initialTetrominoPosition.row;
    this.currentTetrominoPosition.column = this.initialTetrominoPosition.column;
  }

  public getInitialTetrominoShape(): BlockPosition[] {
    return this.tetrominoBlockPositions[0];
  }
}
