export const gridRows = 22;

export const gridColumns = 10;

export const displayScale = 35;

export const shadowScalePercentageMultiplier = 0.15;

export const nextTetrominoViewRows = 4;

export const nextTetrominoViewColumns = 5;

export const scoreMultiplier = 100;

export const tetrominoBlockColors: Record<number, string> = {
  0: 'rgba(0, 0, 0, 1)',    // black
  1: 'rgba(0, 255, 255, 1)', // cyan
  2: 'rgba(0, 0, 255, 1)',   // blue
  3: 'rgba(255, 165, 0, 1)', // orange
  4: 'rgba(255, 255, 0, 1)', // yellow
  5: 'rgba(0, 128, 0, 1)',   // green
  6: 'rgba(128, 0, 128, 1)', // purple
  7: 'rgba(255, 0, 0, 1)',   // red
};

export const ghostTetrominoBlockColors: Record<number, string> = {
  0: 'rgba(192, 192, 192, 0.29)', // Light Gray
  1: 'rgba(173, 216, 230, 0.29)', // Light Blue
  2: 'rgba(173, 216, 230, 0.29)', // Light Blue
  3: 'rgba(255, 182, 193, 0.29)', // Light Pink
  4: 'rgba(255, 255, 153, 0.29)', // Light Yellow
  5: 'rgba(144, 238, 144, 0.29)', // Light Green
  6: 'rgba(221, 160, 221, 0.29)', // Light Purple
  7: 'rgba(255, 99, 71, 0.29)',   // Light Red
};

export enum TetrominoBlockType {
  NORMAL = 'normal',
  GHOST = 'ghost',
}

export const blockColors = {
  [TetrominoBlockType.NORMAL]: tetrominoBlockColors,
  [TetrominoBlockType.GHOST]: ghostTetrominoBlockColors,
};

export const highlightColors = {
  [TetrominoBlockType.NORMAL]: 'rgba(255, 255, 255, 0.5)',
  [TetrominoBlockType.GHOST]: 'rgba(255, 255, 255, 0.06)',
};

export const shadowColors = {
  [TetrominoBlockType.NORMAL]: {
    bottom: `rgba(0, 0, 0, 0.4)`,
    left: `rgba(0, 0, 0, 0.2)`,
  },
  [TetrominoBlockType.GHOST]: {
    bottom: `rgba(0, 0, 0, 0.2)`,
    left: `rgba(0, 0, 0, 0.2)`,
  },
};

export const firstGridRow = 0;

export const secondGridRow = 1;

export enum MovementDirection {
  LEFT = 'left',
  RIGHT = 'right',
  DOWN = 'down',
}

export const tetrominoMovementsDirectionsMap: Record<MovementDirection, { rows: number; columns: number; }> = {
  [MovementDirection.LEFT]: { rows: 0, columns: -1 },
  [MovementDirection.RIGHT]: { rows: 0, columns: 1 },
  [MovementDirection.DOWN] : { rows: 1, columns: 0 },
};

export const gameOverMessage = 'Game Over';
