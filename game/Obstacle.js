export default class Obstacle {
    constructor(context, x, y, width, height, image) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    update(speed, gameSpeed, frameTime, scaleRatio) {
        this.x -= speed * gameSpeed * frameTime * scaleRatio;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}