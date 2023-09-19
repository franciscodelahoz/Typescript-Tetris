import { scoreMultiplier } from '../../constants/general.constants';

export class Score {
  public score: number = 0;

  private scoreIndicator: HTMLElement | null;

  constructor(scoreIndicator: HTMLElement | null) {
    this.score = 0;
    this.scoreIndicator = scoreIndicator;
  }

  public updateScore(numRowsCleared: number) {
    this.score += numRowsCleared * scoreMultiplier;

    if (this.scoreIndicator) {
      this.scoreIndicator.innerHTML = this.score.toString();
    }
  }

  public resetScore() {
    this.score = 0;

    if (this.scoreIndicator) {
      this.scoreIndicator.innerHTML = this.score.toString();
    }
  }
}
