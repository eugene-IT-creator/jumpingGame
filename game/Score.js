export default class Score {
    score = 0;
    HIGH_SCORE_KEY = "highScore";

    constructor(context, scaleRatio) {
        this.context = context;
        this.canvas = context.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(frameTime) {
        this.score += frameTime * 0.01;
    }

    reset() {
        this.score = 0;
    }

    setHighScore() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        if (this.score > highScore) {
            localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
        }
    }

    draw() {
        const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
        const y = 25 * this.scaleRatio;

        const fontSize = 20 * this.scaleRatio;
        this.context.font = `${fontSize}px serif`;
        this.context.fillStyle = "#fb8500";
        const scoreX = this.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 180 * this.scaleRatio;

        const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
        const highScorePadded = highScore.toString().padStart(6, 0);

        this.context.fillText(scorePadded, scoreX, y);
        this.context.fillText(`High Score: ${highScorePadded}`, highScoreX, y);
    }
}