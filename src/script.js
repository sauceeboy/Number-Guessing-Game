const hintText = document.getElementById("hintText");
const input = document.getElementById("input");

let random = Math.floor(Math.random() * 100) + 1;

function onGuess() {
    let userInput = Number(input.value);

    if (userInput === random) {
        hintText.textContent = "Correct! Refresh to play again.";
        hintText.style.color = "#00F719";
    }
    else if (userInput > 100 || userInput < 1) {
        hintText.textContent = "Error: Number is not 1 - 100";
        hintText.style.color = "#E61717";
    }
    else if (Math.abs(userInput - random) <= 10) {
        if (userInput > random) {
            hintText.textContent = "Lower, but within 10!";
        } else {
            hintText.textContent = "Higher, but within 10!";
        }
        hintText.style.color = "#05ca99";
    }
    else if (userInput > random) {
        hintText.textContent = "Lower";
        hintText.style.color = "#34A6F7";
    }
    else if (userInput < random) {
        hintText.textContent = "Higher";
        hintText.style.color = "#34A6F7";
    }
}

function onGiveUp() {
    hintText.textContent = "Gave up, number was: " + random + "! Refresh to restart";
    hintText.style.color = "#34A6F7";
}

function onClear() {
    input.value = "";
}

function openPicker() {
    colorPicker.click();
}


document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === ".") {
        window.location.href = "dev.html";
    }
})
