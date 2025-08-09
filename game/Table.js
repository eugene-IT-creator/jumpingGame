export default class Table {
    constructor(context, height, width, speed, scaleRatio) {
        this.context = context;
        this.canvas = context.canvas;
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - this.height;

        this.tableImage = new Image();
        this.tableImage.src = "images/table.png"
    }

    draw() {
        this.context.drawImage(this.tableImage, this.x, this.y, this.width, this.height);
        this.context.drawImage(this.tableImage, this.x + this.width, this.y, this.width, this.height);

        if (this.x < -this.width)  this.x = 0;
    }

    update(gameSpeed, frameTime) {
        this.x -= gameSpeed * frameTime * this.speed * this.scaleRatio;
    }

    reset() {
        this.x = 0;
    }
}
