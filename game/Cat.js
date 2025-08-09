export default class Cat {
    jumpPressed = false;
    jumping = false;
    falling = false;
    JUMP_SPEED = 15; 
    GRAVITY = 6;
    constructor(context, height, width, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.context = context;
        this.canvas = context.canvas;
        this.height = height;
        this.width = width;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 30 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yInitial = this.y;
        this.image = new Image();
        this.image.src = "images/meme-cat.png";

        window.removeEventListener("keydown", this.keyDown);
        window.removeEventListener("keyup", this.keyUp);

        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }

    keyDown = (e) => {
        if (e.code === "Space") {
            this.jumpPressed = true;
        }
    }

    keyUp = (e) => {
        if (e.code === "Space") {
            this.jumpPressed = false;
        }
    }

    update(frameTime) {
        this.jump(frameTime)
    }

    jump(frameTime) {
        if (this.jumpPressed) {
            this.jumping = true;
        }

        if (this.jumping && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight || this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed) {
                this.y -= this.JUMP_SPEED * frameTime * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if (this.y < this.yInitial) {
                this.y += this.GRAVITY * frameTime * this.scaleRatio;
                if (this.y + this.height > this.canvas.height) {
                    this.y = this.yInitial;
                }
            } else {
                this.falling = false;
                this.jumping = false;
            }
        }
    }
    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}


