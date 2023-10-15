export class Grid {
  private rows: number;

  private columns: number;

  private grid: Array<Array<number>>;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;

    this.grid = Array.from({ length: rows }, () => new Array<number>(columns).fill(0));
  }

  public isPositionWithinGridBounds(row: number, column: number): boolean {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  public getCellValue(row: number, column: number): number {
    return this.grid[row][column];
  }

  public isEmptyRow(row: number): boolean {
    return this.grid[row].every((cell) => cell === 0);
  }

  public isValidAndEmptyCell(row: number, column: number): boolean {
    return this.isPositionWithinGridBounds(row, column) && this.getCellValue(row, column) === 0;
  }

  public isRowFilled(row: number): boolean {
    return this.grid[row].every((cell) => cell !== 0);
  }

  public clearRowCells(row: number): void {
    this.grid[row].fill(0);
  }

  public setCellValue(row: number, column: number, value: number): void {
    this.grid[row][column] = value;
  }

  public isValidCell(row: number, column: number): boolean {
    return this.isPositionWithinGridBounds(row, column);
  }

  public isEmptyCell = (row: number, column: number): boolean => {
    if (row < 0) {
      return true;
    }

    return this.grid[row]?.[column] === 0;
  }

  get getGrid(): number[][] {
    return this.grid;
  }

  get getColumnCount(): number {
    return this.columns;
  }

  public clearGrid(): void {
    this.grid = Array.from({ length: this.rows }, () => new Array<number>(this.columns).fill(0));
  }
}
