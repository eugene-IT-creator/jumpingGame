import { getBy } from "../helpers.js";
import Cat from "./Cat.js";
import Table from "./Table.js";

const canvas = getBy("#game-container");
const context = canvas.getContext("2d");
const FRAME_TIME = 16.67;
const GAME_SPEED_INITIAL = 0.75;
const SPEED_INCREMENT = 0.00001;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const CAT_WIDTH = 88 / 1.5;
const CAT_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 140;
const TABLE_WIDTH = 2400;
const TABLE_HEIGHT = 24;
const OBSTACLE_SPEED = 0.5;

let cat = null;
let scaleRatio = null;
let table = null;
let gameSpeed = GAME_SPEED_INITIAL;

function setScreenDimensions() {
    scaleRatio = getScaleRation();
    canvas.height = GAME_HEIGHT * scaleRatio;
    canvas.width = GAME_WIDTH * scaleRatio;
}

function createElements() {
    let scaledCatHeight = CAT_HEIGHT * scaleRatio;
    let scaledCatWidth = CAT_WIDTH * scaleRatio;
    let scaledMinJumpHeight = MIN_JUMP_HEIGHT * scaleRatio;
    let scaledMaxJumpHeight = MAX_JUMP_HEIGHT * scaleRatio;
    let scaledTableHeight = TABLE_HEIGHT * scaleRatio;
    let scaledTableWidth = TABLE_WIDTH * scaleRatio;

    cat = new Cat(context, scaledCatHeight, scaledCatWidth, scaledMinJumpHeight, scaledMaxJumpHeight, scaleRatio);

    table = new Table(context, scaledTableHeight, scaledTableWidth, OBSTACLE_SPEED, scaleRatio);
}

export function setScreen() {
    setScreenDimensions();
    window.addEventListener("resize", setScreen);
    createElements();
}


function getScaleRation() {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;

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

export function startGame() {
    clearScreen();

    table.update(gameSpeed, FRAME_TIME);
    cat.update(FRAME_TIME);

    table.draw();
    cat.draw();
    requestAnimationFrame(startGame);
}
