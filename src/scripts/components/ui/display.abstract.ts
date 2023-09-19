import {
  TetrominoBlockType,
  blockColors,
  highlightColors,
  shadowColors,
  shadowScalePercentageMultiplier,
} from '../../constants/general.constants';

export abstract class Display {
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  protected displayScale: number;

  protected foregroundColor: string;

  public displayWidth: number;

  public displayHeight: number;

  protected rows: number;

  protected columns: number;

  constructor(
    htmlCanvas: HTMLCanvasElement | null,
    gridRows: number,
    gridColumns: number,
    displayScale: number
  ) {
    if (!htmlCanvas) {
      throw 'Unable to reach the canvas element';
    }

    this.canvas = htmlCanvas;
    const canvasContext = this.canvas.getContext('2d');

    if (!canvasContext) {
      throw 'Unable to reach the rendering context';
    }

    this.context = canvasContext;

    this.context = canvasContext;

    this.rows = gridRows;
    this.columns = gridColumns;

    this.displayScale = displayScale;

    this.displayWidth = this.columns * this.displayScale;
    this.displayHeight = this.rows * this.displayScale;

    this.context.canvas.width = this.displayWidth;
    this.context.canvas.height = this.displayHeight;

    this.foregroundColor = '#000';
  }

  public clearDisplay() {
    this.context.fillStyle = this.foregroundColor;
    this.context.fillRect(0, 0, this.displayWidth, this.displayHeight);
  }

  public drawGrid() {
    this.context.beginPath();
    for (var x = 0; x < this.displayWidth; x += this.displayScale) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.displayHeight);
    }

    for (var y = 0; y < this.displayHeight; y += this.displayScale) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.displayWidth, y);
    }

    this.context.strokeStyle = 'gray';
    this.context.lineWidth = 1;

    this.context.closePath();
    this.context.stroke();
  }

  private drawBlockTopHighlight(x: number, y: number, blockSize: number, shadowSize: number, color: string) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x + shadowSize, y + shadowSize);
    this.context.lineTo(x + blockSize - shadowSize, y + shadowSize);
    this.context.lineTo(x + blockSize, y);
    this.context.lineTo(x, y);
    this.context.closePath();
    this.context.fill();
  }

  private drawBlockRightHighlight(x: number, y: number, blockSize: number, shadowSize: number, color: string) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x + blockSize, y);
    this.context.lineTo(x + blockSize, y + blockSize);
    this.context.lineTo(x + blockSize - shadowSize, y + blockSize - shadowSize);
    this.context.lineTo(x + blockSize - shadowSize, y + shadowSize);
    this.context.closePath();
    this.context.fill();
  }

  private drawBlockLeftShadow(x: number, y: number, blockSize: number, shadowSize: number, color: string) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x, y + blockSize);
    this.context.lineTo(x, y);
    this.context.lineTo(x + shadowSize, y + shadowSize);
    this.context.lineTo(x + shadowSize, y + blockSize - shadowSize);
    this.context.closePath();
    this.context.fill();
  }

  private drawBlockBottomShadow(x: number, y: number, blockSize: number, shadowSize: number, color: string) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x + blockSize - shadowSize, y + blockSize - shadowSize);
    this.context.lineTo(x + shadowSize, y + blockSize - shadowSize);
    this.context.lineTo(x, y + blockSize);
    this.context.lineTo(x + blockSize, y + blockSize);
    this.context.closePath();
    this.context.fill();
  }

  abstract calculateBlockPosition(row: number, column: number): { x: number, y: number };

  public drawBlock(row: number, column: number, tetrominoId: number, blockType: TetrominoBlockType = TetrominoBlockType.NORMAL) {
    const blockColor = blockColors[blockType][tetrominoId];

    const highlightColor = highlightColors[blockType];
    const bottomShadowColor = shadowColors[blockType].bottom;
    const leftShadowColor = shadowColors[blockType].left;

    const { x, y } = this.calculateBlockPosition(row, column);

    const blockSize = this.displayScale;
    const shadowSize = blockSize * shadowScalePercentageMultiplier;

    // Draw the block with the given color
    this.context.fillStyle = blockColor;
    this.context.fillRect(x, y, blockSize, blockSize);

    // Top highlight
    this.drawBlockTopHighlight(x, y, blockSize, shadowSize, highlightColor);

    // Right highlight
    this.drawBlockRightHighlight(x, y, blockSize, shadowSize, highlightColor);

    // Left shadow
    this.drawBlockLeftShadow(x, y, blockSize, shadowSize, leftShadowColor);

    // Bottom shadow
    this.drawBlockBottomShadow(x, y, blockSize, shadowSize, bottomShadowColor);
  }
}
