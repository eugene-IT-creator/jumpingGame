import { getBy } from "../helpers.js";
import Cat from "./Cat.js";
import Table from "./Table.js";
import ObstacleController from "./ObstacleController.js";
import Score from "./Score.js";

const canvas = getBy("#game-container");
const context = canvas.getContext("2d");
const FRAME_TIME = 16.67;
const GAME_SPEED_INITIAL = 0.9;
const SPEED_INCREMENT = 0.00002;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const CAT_WIDTH = 88 / 1.5;
const CAT_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const TABLE_WIDTH = 2400;
const TABLE_HEIGHT = 24;
const OBSTACLE_SPEED = 0.5;
const OBSTACLES = [
    { width: 55 / 1.5, height: 70 / 1.5, image: "../images/glass.png" },
    { width: 150 / 1.5, height: 100 / 1.5, image: "../images/laptop.png" },
    { width: 100 / 1.5, height: 100 / 1.5, image: "../images/laptop2.png" },
    { width: 100 / 1.5, height: 100 / 1.5, image: "../images/smartphones.png" },
]

let cat = null;
let scaleRatio = null;
let table = null;
let obstacleController = null;
let gameSpeed = GAME_SPEED_INITIAL;
let score = null;

let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function setScreenDimensions() {
    scaleRatio = getScaleRatio();
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

    const obstacleImages = OBSTACLES.map(obstacle => {
        const image = new Image();
        image.src = obstacle.image;
        return {
            image: image,
            width: obstacle.width * scaleRatio,
            height: obstacle.height * scaleRatio
        }
    });

    obstacleController = new ObstacleController(context, obstacleImages, scaleRatio, OBSTACLE_SPEED);

    score = new Score(context, scaleRatio);
}

export function setScreen() {
    setScreenDimensions();
    window.addEventListener("resize", setScreen);
    createElements();
}


function getScaleRatio() {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;

    if ((screenWidth / screenHeight) < (GAME_WIDTH / GAME_HEIGHT)) {
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT;
    }
}

function showGameOver() {
    const fontSize = 45 * scaleRatio;
    context.font = `${fontSize}px Calibri`;
    context.fillStyle = "#035365";
    const x = canvas.width / 6;
    const y = canvas.height / 2;
    context.fillText("DEVICE DESTROYED! Run away!", x, y);
}

function setupGameReset() {
    if (!hasAddedEventListenersForRestart) {
        hasAddedEventListenersForRestart = true;

        setTimeout(() => {
            window.addEventListener("keyup", reset, { once: true });
            window.addEventListener("touchstart", reset, { once: true });
        }, 1000);
    }
}

export function reset() {
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingToStart = false;
    table.reset();
    obstacleController.reset();
    score.reset();
    gameSpeed = GAME_SPEED_INITIAL;
}

function showStartGameText() {
    const fontSize = 28 * scaleRatio;
    context.font = `${fontSize}px Calibri`;
    context.fillStyle = "#035365";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    context.fillText("Isn't Branko in the room? Tap Screen or press Space to start!", x, y);
}

function updateGameSpeed(FRAME_TIME) {
    gameSpeed += FRAME_TIME * SPEED_INCREMENT;
}

function clearScreen() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
}


export function startGame() {
    clearScreen();
    if (!gameOver && !waitingToStart) {
        table.update(gameSpeed, FRAME_TIME);
        obstacleController.update(gameSpeed, FRAME_TIME);
        cat.update(gameSpeed, FRAME_TIME);
        score.update(FRAME_TIME);
        updateGameSpeed(FRAME_TIME);
    }

    if (!gameOver && obstacleController.collideWith(cat)) {
        gameOver = true;
        setupGameReset();
        score.setHighScore();
    }

    table.draw();
    obstacleController.draw();
    cat.draw();
    score.draw();

    if (gameOver) {
        showGameOver();
    }

    if (waitingToStart) {
        showStartGameText();
    }

    requestAnimationFrame(startGame);
}

