const hintText = document.getElementById("hintText");
const input = document.getElementById("input");
const scoreText = document.getElementById("score");
const guessBtn = document.getElementById("guessBtn");

const num1 = document.getElementById("costomNum1");
const num2 = document.getElementById("costomNum2");

num1.value = localStorage.getItem("minNum") ?? 1;
num2.value = localStorage.getItem("maxNum") ?? 100;

let score = Number(localStorage.getItem("score")) || 0;
scoreText.textContent = "Score: " + score;

let gameOver = false;

function getMin() {
    return Number(num1.value);
}

function getMax() {
    return Number(num2.value);
}

function saveRange() {
    localStorage.setItem("minNum", num1.value);
    localStorage.setItem("maxNum", num2.value);
}

function newRandom() {
    let min = getMin();
    let max = getMax();

    if (min >= max) {
        hintText.textContent = "Invalid range!";
        hintText.style.color = "#E61717";
        gameOver = true;
        return null;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let random = newRandom();

num1.addEventListener("change", () => {
    saveRange();
    restart();
});

num2.addEventListener("change", () => {
    saveRange();
    restart();
});

function onGuess() {
    if (gameOver) return;

    let guess = Number(input.value);
    let min = getMin();
    let max = getMax();

    if (guess < min || guess > max) {
        hintText.textContent = `Error: Number must be ${min} - ${max}`;
        hintText.style.color = "#E61717";
        return;
    }

    if (guess === random) {
        hintText.textContent = "Correct! Press Restart to play again.";
        hintText.style.color = "#00F719";

        score++;
        scoreText.textContent = "Score: " + score;
        localStorage.setItem("score", score);

        gameOver = true;
        guessBtn.disabled = true;
    }
    else if (Math.abs(guess - random) <= 10) {
        hintText.textContent = guess > random
            ? "Lower, but within 10!"
            : "Higher, but within 10!";
        hintText.style.color = "#05ca99";
    }
    else {
        hintText.textContent = guess > random ? "Lower" : "Higher";
        hintText.style.color = "#34A6F7";
    }
}

function onGiveUp() {
    if (gameOver) return;

    gameOver = true;
    hintText.textContent = "You gave up! The number was: " + random;
    hintText.style.color = "#34A6F7";
    guessBtn.disabled = true;
}

function restart() {
    random = newRandom();
    hintText.textContent = "";
    input.value = "";
    gameOver = false;
    guessBtn.disabled = false;
}

function onClear() {
    input.value = "";
}

function onCScore() {
    score = 0;
    scoreText.textContent = "Score: 0";
    localStorage.setItem("score", score);
}
