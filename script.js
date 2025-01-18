const word = "STOCK";  
let guessedLetters = [];
let lives = 3;
let score = 0;

const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

function initializeGame() {
    gameBoard.innerHTML = "";
    guessedLetters = [];
    lives = 3;
    score = 0;

    for (let i = 0; i < word.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = `card-${i}`;

        const front = document.createElement("div");
        front.classList.add("card-front");
        front.textContent = "?";  
        card.appendChild(front);

        gameBoard.appendChild(card);
    }

    updateDisplays();
}

function updateDisplays() {
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.innerHTML = `Lives: ${"❤️".repeat(lives)}`;
}

function revealLetter(letter) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            const card = document.getElementById(`card-${i}`);
            const front = card.querySelector('.card-front');
            front.textContent = "";  

            const imgPath = `images/letters/${letter.toLowerCase()}.png`;
            front.style.backgroundImage = `url('${imgPath}')`;
            front.style.backgroundSize = 'contain';
            front.style.backgroundPosition = 'center';
            front.style.backgroundRepeat = 'no-repeat';
        }
    }
}

function revealAllLetters() {
    for (let i = 0; i < word.length; i++) {
        revealLetter(word[i]);
    }
}

submitBtn.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = "";

    if (guess.length === 1) {
        if (word.includes(guess)) {
            if (guessedLetters.includes(guess)) {
                lives--; 
                alert("You already guessed this letter! Lost a life.");
            } else {
                guessedLetters.push(guess);
                score += 20;
                revealLetter(guess);
            }
        } else {
            lives--; 
        }
    } else if (guess.length > 1) {
        if (guess === word) {
            score += 100;
            revealAllLetters();  
            setTimeout(() => {
                alert("Congratulations! You guessed the word correctly!");  
            }, 300);  
            checkGameOver(true);
            return;
        } else {
            lives = 0;
            alert("Wrong guess! Game Over.");
        }
    }

    checkGameOver();
    updateDisplays();
});

function checkGameOver(isWordGuessed = false) {
    if (lives <= 0) {
        alert("Game Over! You lost all your lives.");
        initializeGame();
    } else if (isWordGuessed || guessedLetters.length === word.length) {
        setTimeout(() => {
            alert("You won! You guessed the word correctly.");
            initializeGame();
        }, 300);
    }
}

resetBtn.addEventListener("click", initializeGame);

initializeGame();