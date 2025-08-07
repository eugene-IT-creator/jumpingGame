import Obstacle from "./Obstacle.js";
export default class ObstacleController {
    OBSTACLE_INTERVAL_MIN = 800;
    OBSTACLE_INTERVAL_MAX = 2500;

    nextObstacleInterval = null;
    obstacles = [];

    constructor(context, obstacleImages, scaleRatio, speed) {
        this.context = context;
        this.canvas = context.canvas;
        this.obstacleImages = obstacleImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextObstacleTime();
    }
    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    setNextObstacleTime() {
        const randomNumber = this.generateRandomNumber(this.OBSTACLE_INTERVAL_MIN, this.OBSTACLE_INTERVAL_MAX);
        this.nextObstacleInterval = randomNumber;
        console.log(this.nextObstacleInterval);
    }
    spawnObstacle() {
        const index = this.generateRandomNumber(0, this.obstacleImages.length - 1);
        const obstacleImage = this.obstacleImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImage.height;
        const obstacle = new Obstacle(this.context, x, y, obstacleImage.width, obstacleImage.height, obstacleImage.image);
        this.obstacles.push(obstacle);
    }

    update(gameSpeed, frameTime) {
        if (this.nextObstacleInterval <= 0) {
            this.spawnObstacle();
            this.setNextObstacleTime();
        }
        this.nextObstacleInterval -= frameTime;
        this.obstacles.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTime, this.scaleRatio);
        })

        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width);
        console.log(this.obstacles.length);
    }

    draw() {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw();
        })
    }

    collideWith(sprite) {
        return this.obstacles.some((obstacle) => obstacle.collideWith(sprite));
    }

    reset() {
        this.obstacles = [];
    }
}