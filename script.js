let startBtn = document.getElementsByClassName("start-btn");
let startGameElement = document.getElementsByClassName("start-game");

let character = document.getElementById("character");
let block = document.getElementById("block");

let modal = document.getElementsByClassName("modal");

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }
    setTimeout(function () {
        character.classList.remove("animate");
    }, 500)
}


setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 350 && blockLeft > 0 && characterTop >= 370) {
        block.style.animation = "none";
        block.style.animation = "display";
        // modal.style.display = "block";

        // alert("You lose")
    }
}, 10);

function startGame() {
    startBtn.addEventListener("click", function () {
        startGameElement.style.display = "none";
    });
}

character.addEventListener("click", jump)



