const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let wrongGuesses = 0;
let targetColor;

const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5"
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;
  wrongGuesses = 0; 

  colorOptions.innerHTML = '';

  const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
  shuffledColors.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.setAttribute('data-testid', 'colorOption');
    button.addEventListener('click', () => checkGuess(color));
    colorOptions.appendChild(button);
  });

  gameStatus.textContent = "Make your guess!";
  document.body.style.backgroundColor = "#f4f4f4"; 
}

function checkGuess(guess) {
  if (guess === targetColor) {
    gameStatus.textContent = "Correct!";
    score++;
    scoreElement.textContent = score;
    document.body.style.backgroundColor = "#4CAF50"; 
    setTimeout(() => {
      document.body.style.backgroundColor = "#f4f4f4";
      initGame();
    }, 1000); 
  } else {
    wrongGuesses++;
    if (wrongGuesses >= 3) {
      gameStatus.textContent = "Game Over! You made 3 wrong guesses.";
      document.body.style.backgroundColor = "#FF5733"; 
      setTimeout(() => {
        score = 0;
        scoreElement.textContent = score;
        initGame();
      }, 2000); 
    } else {
      gameStatus.textContent = `Wrong! Try again. (${wrongGuesses}/3 wrong guesses)`;
      document.body.style.backgroundColor = "#FF5733";
      setTimeout(() => {
        document.body.style.backgroundColor = "#f4f4f4"; 
      }, 500); 
    }
  }
}

newGameButton.addEventListener('click', () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

initGame();