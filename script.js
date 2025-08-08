import {setScreen, startGame, reset} from "./game/mainGame.js";

setScreen();
requestAnimationFrame(startGame);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });




