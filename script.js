import {gameLoop, setScreen, setupGameReset, showGameOver, showStartGameText, startGame} from "./game/mainGame.js";

setScreen();
showStartGameText();
startGame();

showGameOver();
setupGameReset();
gameLoop();



