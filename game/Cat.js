import { game } from "./screenSetup.js";

export default class Cat {
    constructor(context, height, width, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.context = context;
        this.canvas = context.canvas;
        this.height = height;
        this.width = width;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - (1.5 * scaleRatio);
        this.image = new Image();
        // this.imageLoaded = false;
        this.image.src = "../images/meme-cat.png";
        // this.image.onload = () => {
        //     console.log('image has loaded');
        //     this.imageLoaded = true;
        //     game();
        // }
    }

    draw() {
        // console.log("draw called", this.imageLoaded);
        // if (this.imageLoaded) {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height)   
        // }
    }
}


