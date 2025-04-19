// view.js: Handles all DOM rendering and input for Carrot Hangman

const carrotField = document.getElementById('carrot-field');
const guessWordDiv = document.getElementById('guess-word');
const gameMessageDiv = document.getElementById('game-message');

/**
 * Render the guessed word so far, with blanks for unknown letters
 * @param {string[]} guessArr - Array of letters/underscores for each position
 */
function renderGuessWord(guessArr) {
    guessWordDiv.innerHTML = '';
    guessArr.forEach(char => {
        const span = document.createElement('span');
        span.className = 'guess-letter';
        span.textContent = char;
        guessWordDiv.appendChild(span);
    });
}

/**
 * Render the carrots: eaten and not eaten
 * @param {number} total - total number of carrots
 * @param {number} eaten - number of carrots eaten (wrong guesses)
 */
function renderCarrots(total, eaten) {
    carrotField.innerHTML = '';
    for (let i = 0; i < total; i++) {
        // Create SVG element for carrot
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "40");
        svg.setAttribute("viewBox", "0 0 40 40");
        svg.classList.add('carrot');
        if (i < eaten) svg.classList.add('eaten');
        svg.setAttribute('aria-label', 'Carrot');

        // Carrot body (orange)
        const carrotBody = document.createElementNS(svgNS, "ellipse");
        carrotBody.setAttribute("cx", "20");
        carrotBody.setAttribute("cy", "26");
        carrotBody.setAttribute("rx", "9");
        carrotBody.setAttribute("ry", "14");
        carrotBody.setAttribute("fill", "#ff9933");
        carrotBody.setAttribute("stroke", "#d97a00");
        carrotBody.setAttribute("stroke-width", "2");
        svg.appendChild(carrotBody);

        // Carrot greens (top)
        const green1 = document.createElementNS(svgNS, "rect");
        green1.setAttribute("x", "18");
        green1.setAttribute("y", "4");
        green1.setAttribute("width", "4");
        green1.setAttribute("height", "12");
        green1.setAttribute("fill", "#4caf50");
        green1.setAttribute("rx", "2");
        svg.appendChild(green1);

        const green2 = document.createElementNS(svgNS, "rect");
        green2.setAttribute("x", "13");
        green2.setAttribute("y", "7");
        green2.setAttribute("width", "4");
        green2.setAttribute("height", "10");
        green2.setAttribute("fill", "#388e3c");
        green2.setAttribute("rx", "2");
        green2.setAttribute("transform", "rotate(-15 15 12)");
        svg.appendChild(green2);

        const green3 = document.createElementNS(svgNS, "rect");
        green3.setAttribute("x", "23");
        green3.setAttribute("y", "7");
        green3.setAttribute("width", "4");
        green3.setAttribute("height", "10");
        green3.setAttribute("fill", "#388e3c");
        green3.setAttribute("rx", "2");
        green3.setAttribute("transform", "rotate(15 25 12)");
        svg.appendChild(green3);

        carrotField.appendChild(svg);
    }
}

/**
 * Show a message to the player (e.g., win/lose)
 * @param {string} msg
 */
function showMessage(msg) {
    gameMessageDiv.textContent = msg;
}

/**
 * Listen for keypresses and call callback(letter)
 * @param {(letter: string) => void} callback
 */
function listenForKeypress(callback) {
    window.addEventListener('keydown', function handler(e) {
        const letter = e.key.toLowerCase();
        if (/^[a-z]$/.test(letter)) {
            callback(letter);
        }
    });
}

/**
 * Listen for Give Up button click and call callback()
 * @param {() => void} callback
 */
function listenForGiveUp(callback) {
    const btn = document.getElementById('give-up-btn');
    if (btn) {
        btn.addEventListener('click', function handler(e) {
            callback();
        });
    }
}

/**
 * Listen for Guess Word button or Enter key in input, and call callback(wordGuess)
 * @param {(word: string) => void} callback
 */
function listenForWordGuess(callback) {
    const btn = document.getElementById('guess-word-btn');
    const input = document.getElementById('guess-word-input');
    if (btn && input) {
        btn.addEventListener('click', function handler(e) {
            callback(input.value.trim());
            input.value = '';
        });
        input.addEventListener('keydown', function handler(e) {
            if (e.key === 'Enter') {
                callback(input.value.trim());
                input.value = '';
            }
        });
    }
}

// Export functions for use in script.js (if using modules, otherwise global)
window.carrotView = {
    renderGuessWord,
    renderCarrots,
    showMessage,
    setupView
};

/**
 * Setup all view event listeners in one call
 * @param {(letter: string) => void} onKeyPress
 * @param {() => void} onGiveUp
 * @param {(word: string) => void} onWordGuess
 */
function setupView(onKeyPress, onGiveUp, onWordGuess) {
    listenForKeypress(onKeyPress);
    listenForGiveUp(onGiveUp);
    listenForWordGuess(onWordGuess);
}
