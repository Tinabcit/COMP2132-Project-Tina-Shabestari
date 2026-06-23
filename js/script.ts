/* 
    Tina Shabestari
    COMP2132 Project
    StudentID: A01002676
    Study Hangman
*/
export {};

// Object structure for each word in words.json
interface WordData {
    category: string;
    word: string;
    hint: string;
}
// Stores the current game information
const game = {
    words: [] as WordData[],
    selectedCategory: "",
    selectedWord: "",
    selectedHint: "",
    guessedLetters: [] as string[],
    wrongGuesses: 0,
    maxWrongGuesses: 6
};
// Getting elements from the page
const category = document.getElementById("category") as HTMLElement;
const hint = document.getElementById("hint") as HTMLElement;
const wordDisplay = document.getElementById("wordDisplay") as HTMLDivElement;
const hangmanImage = document.getElementById("hangmanImage") as HTMLImageElement;
const letterInput = document.getElementById("letterInput") as HTMLInputElement;
const guessButton = document.getElementById("guessButton") as HTMLButtonElement;
const usedLetters = document.getElementById("usedLetters") as HTMLElement;
const remainingAttempts = document.getElementById("remainingAttempts") as HTMLElement;
const wrongGuesses = document.getElementById("wrongGuesses") as HTMLElement;
const message = document.getElementById("message") as HTMLHeadingElement;
const playAgainButton = document.getElementById("playAgainButton") as HTMLButtonElement;

// Loads words and hints from the JSON file
async function loadWords(): Promise<void>
{
    try
    {
        const response: Response = await fetch("../data/words.json");
        if (!response.ok)
        {
            throw new Error("Could not load words.json");
        }
        game.words = await response.json();
        startGame();
    }
    catch(error)
    {
        hint.textContent = "Words could not load.";
        console.error(error);
    }
}
// Starts a new game
function startGame(): void
{
    // Pick a random word from the JSON file
    const randomIndex: number =
        Math.floor(Math.random() * game.words.length);

    game.selectedCategory = game.words[randomIndex].category;
    game.selectedWord = game.words[randomIndex].word.toLowerCase();
    game.selectedHint = game.words[randomIndex].hint;

    // Reset game values
    game.guessedLetters = [];
    game.wrongGuesses = 0;

    // Update page information
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

    // Reset hangman image
    hangmanImage.src = "../images/hangman0.png";

    playAgainButton.classList.add("hidden");

    updateWordDisplay();

    letterInput.focus();
}

// Updates the hidden word on the screen
function updateWordDisplay(): void
{
    let display: string = "";

    for (const letter of game.selectedWord)
    {
        if (game.guessedLetters.includes(letter))
        {
            display += letter + " ";
        }
        else
        {
            display += "_ ";
        }
    }

    wordDisplay.textContent = display;

    // Player wins if there are no underscores left
    if (!display.includes("_"))
    {
        endGame(true);
    }
}

// Checks the user's letter guess
function guessLetter(): void
{
    const letter: string = letterInput.value.toLowerCase();

    letterInput.value = "";

    // Make sure only one letter is entered
    if (!/^[a-z]$/.test(letter))
    {
        message.textContent = "Please enter one letter.";
        return;
    }

    // Prevent duplicate guesses
    if (game.guessedLetters.includes(letter))
    {
        message.textContent = "You already guessed that letter.";
        return;
    }

    game.guessedLetters.push(letter);

    usedLetters.textContent =
        "Used Letters: " + game.guessedLetters.join(", ");

    // Correct guess
    if (game.selectedWord.includes(letter))
    {
        message.textContent = "Good guess!";
        updateWordDisplay();
    }
    else
    {
        // Wrong guess
        game.wrongGuesses++;

        hangmanImage.src =
            "../images/hangman" + game.wrongGuesses + ".png";

        wrongGuesses.textContent =
            game.wrongGuesses + " / " + game.maxWrongGuesses;

        remainingAttempts.textContent =
            String(game.maxWrongGuesses - game.wrongGuesses);

        message.textContent = "Wrong guess.";

        // Player loses after 6 wrong guesses
        if (game.wrongGuesses >= game.maxWrongGuesses)
        {
            endGame(false);
        }
    }

    letterInput.focus();
}

// Ends the game and shows the result
function endGame(playerWon: boolean): void
{
    letterInput.disabled = true;
    guessButton.disabled = true;

    playAgainButton.classList.remove("hidden");

    if (playerWon)
    {
        message.textContent = "🎉 You Won!";
        message.className = "win";
    }
    else
    {
        message.textContent =  "📚 You Lost! The word was: " + game.selectedWord;
        message.className = "lose";
    }
}

// Guess button click event
guessButton.addEventListener("click", guessLetter);

// Allow Enter key to submit a guess
letterInput.addEventListener("keyup", function(event: KeyboardEvent): void
{
    if (event.key === "Enter")
    {
        guessLetter();
    }
});

// Start a new game when Play Again is clicked
playAgainButton.addEventListener("click", startGame);

// Load the words when the page opens
loadWords();