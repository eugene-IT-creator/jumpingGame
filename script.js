let character = document.getElementById("character");
let block = document.getElementById("block");

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }
    setTimeout(function () {
        character.classList.remove("animate");
    }, 500)
}

let check = setInterval(function () {
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft < 220 && blockLeft > 0 && characterBottom <= 20) {
        block.style.animation = "none";
        block.style.animation = "display";
        alert("You lose")
    }
}, 10);

character.addEventListener("click", jump);
