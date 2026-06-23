"use strict";
/* Tina Shabestari
   COMP2132 Project
   Study Hangman
*/
const game = {
    words: [],
    selectedCategory: "",
    selectedWord: "",
    selectedHint: "",
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrongGuesses: 6
};
const category = document.getElementById("category");
const hint = document.getElementById("hint");
const wordDisplay = document.getElementById("wordDisplay");
const hangmanImage = document.getElementById("hangmanImage");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const usedLetters = document.getElementById("usedLetters");
const remainingAttempts = document.getElementById("remainingAttempts");
const wrongGuesses = document.getElementById("wrongGuesses");
const message = document.getElementById("message");
const playAgainButton = document.getElementById("playAgainButton");
async function loadWords() {
    try {
        const response = await fetch("../data/words.json");
        if (!response.ok) {
            throw new Error("Could not load words.json");
        }
        game.words = await response.json();
        startGame();
    }
    catch (error) {
        hint.textContent = "Words could not load.";
        console.error(error);
    }
}
function startGame() {
    const randomIndex = Math.floor(Math.random() * game.words.length);
    game.selectedCategory = game.words[randomIndex].category;
    game.selectedWord = game.words[randomIndex].word.toLowerCase();
    game.selectedHint = game.words[randomIndex].hint;
    game.guessedLetters = [];
    game.wrongGuesses = 0;
    category.textContent = game.selectedCategory;
    hint.textContent = game.selectedHint;
    usedLetters.textContent = "Used Letters:";
    remainingAttempts.textContent = String(game.maxWrongGuesses);
    wrongGuesses.textContent = "0 / 6";
    message.textContent = "";
    message.className = "";
    letterInput.value = "";
    letterInput.disabled = false;
    guessButton.disabled = false;
    hangmanImage.src = "../images/hangman0.png";
    playAgainButton.classList.add("hidden");
    updateWordDisplay();
    letterInput.focus();
}
function updateWordDisplay() {
    let display = "";
    for (const letter of game.selectedWord) {
        if (game.guessedLetters.includes(letter)) {
            display += letter + " ";
        }
        else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display;
    if (!display.includes("_")) {
        endGame(true);
    }
}
function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";
    if (!/^[a-z]$/.test(letter)) {
        message.textContent = "Please enter one letter.";
        return;
    }
    if (game.guessedLetters.includes(letter)) {
        message.textContent = "You already guessed that letter.";
        return;
    }
    game.guessedLetters.push(letter);
    usedLetters.textContent =
        "Used Letters: " + game.guessedLetters.join(", ");
    if (game.selectedWord.includes(letter)) {
        message.textContent = "Good guess!";
        updateWordDisplay();
    }
    else {
        game.wrongGuesses++;
        hangmanImage.src =
            "../images/hangman" + game.wrongGuesses + ".png";
        wrongGuesses.textContent =
            game.wrongGuesses + " / " + game.maxWrongGuesses;
        remainingAttempts.textContent =
            String(game.maxWrongGuesses - game.wrongGuesses);
        message.textContent = "Wrong guess.";
        if (game.wrongGuesses >= game.maxWrongGuesses) {
            endGame(false);
        }
    }
    letterInput.focus();
}
function endGame(playerWon) {
    letterInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.classList.remove("hidden");
    if (playerWon) {
        message.textContent = "🎉 You Won!";
        message.className = "win";
    }
    else {
        message.textContent =
            "📚 You Lost! The word was: " + game.selectedWord;
        message.className = "lose";
    }
}
guessButton.addEventListener("click", guessLetter);
letterInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});
playAgainButton.addEventListener("click", startGame);
loadWords();
