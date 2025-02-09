const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetter = [], wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame = () => {
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModel.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h3").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetter.length === currentWord.length) return gameOver(true);
};

// Creating the button keyboard and adding event listener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.ariaLabel = `Guess letter: ${String.fromCharCode(i)}`;  // Adding accessibility for screen readers

    keyboardDiv.append(button);

    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Set random word at the start of the game
getRandomWord();

playAgainBtn.addEventListener("click", () => {
    gameModel.classList.remove("show");  // Hide the modal when "Play Again" is clicked
    getRandomWord();  // Start a new game
});
