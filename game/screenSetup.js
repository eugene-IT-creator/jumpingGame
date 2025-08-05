import { getBy } from "../helpers.js";

const canvas = getBy("#game-container");
const context = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

function setScreenDimensions() {
    let scaleRatio = getScaleRation();
    canvas.height = GAME_HEIGHT * scaleRatio;
    canvas.width = GAME_WIDTH * scaleRatio;
}

export function setScreen() {
    setScreenDimensions();
    window.addEventListener("resize", setScreen);
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
