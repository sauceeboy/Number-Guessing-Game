const hintText = document.getElementById("hintText");
const input = document.getElementById("input");
const scoreText = document.getElementById("score");

let savedScore = Number(localStorage.getItem("score")) || 0;
let score = savedScore;
scoreText.textContent = "Score: " + score;

let random = Math.floor(Math.random() * 100) + 1;

function onGuess() {
    let userInput = Number(input.value);

    if (userInput === random) {
        hintText.textContent = "Correct! Refresh to play again.";
        hintText.style.color = "#00F719";
        score++;
        scoreText.textContent = "Score: " + score;

        localStorage.setItem("score", score);
    }
    else if (userInput > 100 || userInput < 1) {
        hintText.textContent = "Error: Number is not 1 - 100";
        hintText.style.color = "#E61717";
    }
    else if (Math.abs(userInput - random) <= 10) {
        hintText.textContent = userInput > random ? "Lower, but within 10!" : "Higher, but within 10!";
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

function onCScore() {
    score = 0;
    scoreText.textContent = "Score: " + score;

    localStorage.setItem("score", score);
}

