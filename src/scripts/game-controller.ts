import { TetrominoQueue } from './tetromino-queue';
import { Tetromino } from './components/tetrominos/tetromino.abstract';
import { Grid } from './grid';
import {
  MovementDirection,
  TetrominoBlockType,
  displayScale,
  firstGridRow,
  secondGridRow,
  tetrominoMovementsDirectionsMap
} from './constants/general.constants';
import { BlockPosition } from './types/tetromino';
import { Display } from './components/ui/display.abstract';
import { Score } from './components/ui/score';

export class GameController {
  public grid: Grid;

  public blockQueue: TetrominoQueue;

  private currentTetromino: Tetromino;

  public isGameOver: boolean;

  private gameView: Display;

  private nextTetrominoView: Display;

  private score: Score;

  constructor(
    grid: Grid,
    tetrominoQueue: TetrominoQueue,
    gameView: Display,
    nextTetrominoView: Display,
    score: Score,
  ) {
    this.grid = grid;
    this.blockQueue = tetrominoQueue;
    this.gameView = gameView;
    this.nextTetrominoView = nextTetrominoView;
    this.score = score;

    this.isGameOver = false;
    this.currentTetromino = this.blockQueue.getNextTetromino();
  }

  private tetrominoFitsInPosition(): boolean {
    const currentTetrominoBlocksPositions = this.currentTetromino.getCurrentBlocksPositions();

    for (let position of currentTetrominoBlocksPositions) {
      if (!this.grid.isValidAndEmptyCell(position.row, position.column)) {
        return false;
      }
    }

    return true;
  }

  public rotateTetromino(clockwise: boolean = true): void {
    if (clockwise) {
      this.currentTetromino.rotateClockwise();
    } else {
      this.currentTetromino.rotateCounterClockwise();
    }

    if (!this.tetrominoFitsInPosition()) {
      this.rotateTetromino(!clockwise);
    }
  }

  private checkGameOverConditions(): boolean {
    return !(this.grid.isEmptyRow(firstGridRow) && this.grid.isEmptyRow(secondGridRow));
  }

  private setScore(numRowsCleared: number) {
    this.score.updateScore(numRowsCleared);
  }

  private shiftRowsToDown(startingRow: number): void {
    for (let row = startingRow; row >= 0; row -= 1) {
      for (let column = 0; column < this.grid.getColumnCount; column += 1) {
        this.grid.setCellValue(row + 1, column, this.grid.getGrid[row][column]);
        this.grid.setCellValue(row, column, 0);
      }
    }
  }

  private clearCompletedRows(): number {
    const grid = this.grid.getGrid;
    let clearedRows = 0;

    for (let currentRow = 0; currentRow < grid.length; currentRow += 1) {
      if (this.grid.isRowFilled(currentRow)) {
        this.grid.clearRowCells(currentRow);
        clearedRows += 1;
        this.shiftRowsToDown(currentRow - 1);
      }
    }

    return clearedRows;
  }

  private calculateDistanceFromNearestBottomBlock(position: BlockPosition): number {
    let distance = 0;

    while (this.grid.isValidAndEmptyCell(position.row + distance, position.column)) {
      distance += 1;
    }

    return distance;
  }

  private getMinimumBlockDistanceFromBottomTetromino(): number {
    const currentTetrominoBlocksPositions = this.currentTetromino.getCurrentBlocksPositions();

    const blocksDistancesFromBottom = currentTetrominoBlocksPositions.map((position) => (
      this.calculateDistanceFromNearestBottomBlock(position)
    ));

    return Math.min(...blocksDistancesFromBottom) - 1;
  }

  private handleTetrominoPlacement(): void {
    const currentTetrominoBlocksPositions = this.currentTetromino.getCurrentBlocksPositions();

    for (let position of currentTetrominoBlocksPositions) {
      this.grid.setCellValue(position.row, position.column, this.currentTetromino.tetrominoId);
    }

    this.currentTetromino.resetPosition();

    const clearedRows = this.clearCompletedRows();
    this.setScore(clearedRows);

    if (this.checkGameOverConditions()) {
      this.isGameOver = true;
    } else {
      this.currentTetromino = this.blockQueue.getNextTetromino();
    }
  }

  public moveTetrominoToDirection(direction: MovementDirection): void {
    const {
      rows: movementRows,
      columns: movementColumns,
    } = tetrominoMovementsDirectionsMap[direction];

    this.currentTetromino.move(movementRows, movementColumns);

    if (!this.tetrominoFitsInPosition()) {
      this.currentTetromino.move(-movementRows, -movementColumns);

      if (direction === MovementDirection.DOWN) {
        this.handleTetrominoPlacement();
      }
    }
  }

  public hardMoveTetrominoToBottom(): void {
    const distance = this.getMinimumBlockDistanceFromBottomTetromino();
    this.currentTetromino.move(distance, 0);
    this.handleTetrominoPlacement();
  }

  private drawTetromino() {
    const currentTetromino = this.currentTetromino;
    const currentTetrominoBlocksPositions = currentTetromino.getCurrentBlocksPositions();

    for (let position of currentTetrominoBlocksPositions) {
      this.gameView.drawBlock(position.column, position.row, currentTetromino.tetrominoId);
    }
  }

  private drawGhostTetromino() {
    const currentTetromino = this.currentTetromino;

    const distance = this.getMinimumBlockDistanceFromBottomTetromino();
    const currentTetrominoBlocksPositions = currentTetromino.getCurrentBlocksPositions();

    for (let position of currentTetrominoBlocksPositions) {
      this.gameView.drawBlock(
        position.column,
        position.row + distance,
        currentTetromino.tetrominoId,
        TetrominoBlockType.GHOST
      );
    }
  }

  private drawStoredTetrominosInGrid() {
    for (let y = 0; y < this.grid.getGrid.length; y += 1) {
      for (let x = 0; x < this.grid.getGrid[y].length; x += 1) {
        if (this.grid.getGrid[y][x] !== 0) {
          const tetrominoId = this.grid.getGrid[y][x];
          this.gameView.drawBlock(x, y, tetrominoId);
        }
      }
    }
  }

  private drawNextTetrominoCentered() {
    const nextTetromino = this.blockQueue.currentTetromino;
    const nextTetrominoBlocksPositions = nextTetromino.getTileLocations(0);

    // Calculate the number of rows and columns occupied by the tetromino
    const maxRow = Math.max(...nextTetrominoBlocksPositions.map(block => block.row));
    const minRow = Math.min(...nextTetrominoBlocksPositions.map(block => block.row));
    const maxCol = Math.max(...nextTetrominoBlocksPositions.map(block => block.column));
    const minCol = Math.min(...nextTetrominoBlocksPositions.map(block => block.column));

    // Calculate the size of the centered area
    const centeredWidth = (maxCol - minCol + 1) * displayScale;
    const centeredHeight = (maxRow - minRow + 1) * displayScale;

    // Calculate the centering offsets
    const xOffset = Math.floor((this.nextTetrominoView.displayWidth - centeredWidth) / 2);
    const yOffset = Math.floor((this.nextTetrominoView.displayHeight - centeredHeight) / 2);

    // Draw each block of the tetromino directly
    for (const block of nextTetrominoBlocksPositions) {
      const x = xOffset + (block.column - minCol) * displayScale;
      const y = yOffset + (block.row - minRow) * displayScale;
      this.nextTetrominoView.drawBlock(x, y, nextTetromino.tetrominoId, TetrominoBlockType.NORMAL);
    }
  }

  public render(): void {
    this.gameView.clearDisplay();
    this.gameView.drawGrid();

    this.nextTetrominoView.clearDisplay();
    this.drawNextTetrominoCentered();

    if (!this.isGameOver) {
      this.drawGhostTetromino();
    }

    this.drawTetromino();
    this.drawStoredTetrominosInGrid();
  }
}
