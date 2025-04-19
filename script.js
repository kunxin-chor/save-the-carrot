// script.js: Game logic skeleton for Carrot Hangman
// Students: implement the game logic here and use carrotView from view.js for rendering

// Example game setup (students should replace with their implementation)
const WORD = 'carrot'; // The word to guess (students: randomize or let user choose)
let guessArr = Array.from(WORD, () => '_');
let wrongGuesses = 1;
const MAX_WRONG = 6;

// Initial render
carrotView.renderGuessWord(guessArr);
carrotView.renderCarrots(MAX_WRONG, wrongGuesses);
carrotView.showMessage('');

// Set up all view event listeners in one call
function handleKeyPress(letter) {
    // Students: implement the guessing logic here
    // Example: show message that logic is not implemented
    carrotView.showMessage('Game logic not implemented. Implement this in script.js!');
}

function handleGiveUp() {
    // Reveal the word
    carrotView.renderGuessWord(Array.from(WORD));
    carrotView.showMessage('You gave up! The word was: ' + WORD.toUpperCase());
    // Optionally: disable further input (not implemented here)
}

function handleWordGuess(wordGuess) {
    // code to guess the word here
}

carrotView.setupView(
    handleKeyPress,
    handleGiveUp,
    handleWordGuess
);
