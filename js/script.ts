/* 
   Tina Shabestari
   COMP2132 Project
   StudentID: A01002676
   Study Hangman
*/

// Object structure for each item in words.json
interface WordData {
    category: string;
    word: string;
    hint: string;
}

// Main game object
const game = {
    words: [] as WordData[],
    selectedCategory: "",
    selectedWord: "",
    selectedHint: "",
    guessedLetters: [] as string[],
    wrongGuesses: 0,
    maxWrongGuesses: 6
};

// Getting elements from the HTML page
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

// Load words from JSON file
async function loadWords(): Promise<void>
{
    try
    {
        const response: Response =
            await fetch("../data/words.json");

        if (!response.ok)
        {
            throw new Error("Could not load words.json");
        }

        game.words =
            await response.json();

        startGame();
    }
    catch(error)
    {
        hint.textContent =
            "Words could not load.";

        console.error(error);
    }
}

// Starts or resets the game
function startGame(): void
{
    const randomIndex: number =
        Math.floor(Math.random() * game.words.length);

    game.selectedCategory =
        game.words[randomIndex].category;

    game.selectedWord =
        game.words[randomIndex].word.toLowerCase();

    game.selectedHint =
        game.words[randomIndex].hint;

    game.guessedLetters = [];
    game.wrongGuesses = 0;

    category.textContent =
        game.selectedCategory;

    hint.textContent =
        game.selectedHint;

    usedLetters.textContent =
        "Used Letters:";

    remainingAttempts.textContent =
        String(game.maxWrongGuesses);

    wrongGuesses.textContent =
        "0 / 6";

    message.textContent = "";
    message.className = "";

    letterInput.value = "";
    letterInput.disabled = false;
    guessButton.disabled = false;

    hangmanImage.src =
        "../images/hangman0.png";

    playAgainButton.classList.add("hidden");

    updateWordDisplay();

    letterInput.focus();
}

// Shows the hidden word with guessed letters
function updateWordDisplay(): void
{
    let display: string = "";

    for (const letter of game.selectedWord)
    {
        if (letter === " ")
        {
            display += "  ";
        }
        else if (game.guessedLetters.includes(letter))
        {
            display += letter + " ";
        }
        else
        {
            display += "_ ";
        }
    }

    wordDisplay.textContent =
        display;

    if (!display.includes("_"))
    {
        endGame(true);
    }
}

// Small JavaScript animation for the hangman image
function animateHangmanImage(): void
{
    hangmanImage.animate(
        [
            {
                opacity: 0.4,
                transform: "scale(0.96)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],
        {
            duration: 300,
            easing: "ease-out"
        }
    );
}

// Checks the letter guessed by the user
function guessLetter(): void
{
    const letter: string =
        letterInput.value.toLowerCase();

    letterInput.value = "";

    if (!/^[a-z]$/.test(letter))
    {
        message.textContent =
            "Please enter one letter.";

        return;
    }

    if (game.guessedLetters.includes(letter))
    {
        message.textContent =
            "You already guessed that letter.";

        return;
    }

    game.guessedLetters.push(letter);

    usedLetters.textContent =
        "Used Letters: " +
        game.guessedLetters.join(", ");

    if (game.selectedWord.includes(letter))
    {
        message.textContent =
            "Good guess!";

        updateWordDisplay();
    }
    else
    {
        game.wrongGuesses++;

        hangmanImage.src =
            "../images/hangman" +
            game.wrongGuesses +
            ".png";

        animateHangmanImage();

        wrongGuesses.textContent =
            game.wrongGuesses +
            " / " +
            game.maxWrongGuesses;

        remainingAttempts.textContent =
            String(
                game.maxWrongGuesses -
                game.wrongGuesses
            );

        message.textContent =
            "Wrong guess.";

        if (game.wrongGuesses >= game.maxWrongGuesses)
        {
            endGame(false);
        }
    }

    letterInput.focus();
}

// Ends the game and shows result message
function endGame(playerWon: boolean): void
{
    letterInput.disabled = true;
    guessButton.disabled = true;

    playAgainButton.classList.remove("hidden");

    if (playerWon)
    {
        message.textContent =
            "🎉 You Won!";

        message.className =
            "win";
    }
    else
    {
        message.textContent =
            "📚 You Lost! The word was: " +
            game.selectedWord;

        message.className =
            "lose";
    }
}

// Button and keyboard events
guessButton.addEventListener(
    "click",
    guessLetter
);

letterInput.addEventListener(
    "keyup",
    function(event: KeyboardEvent): void
    {
        if (event.key === "Enter")
        {
            guessLetter();
        }
    }
);

playAgainButton.addEventListener(
    "click",
    startGame
);

// Start the game after loading JSON
loadWords();

export {};