import { getBy } from "../helpers.js";
import Cat from "./Cat.js";

const canvas = getBy("#game-container");
const context = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const CAT_WIDTH = 88 / 1.5;
const CAT_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 140;

let cat;
let scaleRatio;

function setScreenDimensions() {
    scaleRatio = getScaleRation();
    canvas.height = GAME_HEIGHT * scaleRatio;
    canvas.width = GAME_WIDTH * scaleRatio;
}

function createElements() {
    const scaledCatHeight = CAT_HEIGHT * scaleRatio;
    const scaledCatWidth = CAT_WIDTH * scaleRatio;
    const scaledMinJumpHeight = MIN_JUMP_HEIGHT * scaleRatio;
    const scaledMaxJumpHeight = MAX_JUMP_HEIGHT * scaleRatio;

    cat = new Cat(context, scaledCatHeight, scaledCatWidth, scaledMinJumpHeight, scaledMaxJumpHeight, scaleRatio)
}

export function setScreen() {
    setScreenDimensions();
    window.addEventListener("resize", setScreen);
    createElements();
}


function getScaleRation() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    if ((screenWidth / screenHeight) < (GAME_WIDTH / GAME_HEIGHT)) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

function clearScreen() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export function game() {
    clearScreen();
    console.log("game loop");
    cat.draw()

    requestAnimationFrame(game);
}
