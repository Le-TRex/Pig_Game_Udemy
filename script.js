'use strict';
// Selecting elements
const score0Element = document.querySelector('#score--0');
const current0Element = document.getElementById('current--0');
const player0 = document.querySelector('.player--0');
const score1Element = document.getElementById('score--1');
const current1Element = document.getElementById('current--1');
const player1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Useful variables
let activePlayer;
let scores = [];
let currentScore;
let playing;

// Generating die value
const dieValueGeneration = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// Starting conditions
const startingConditions = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current0Element.textContent = 0;

  diceElement.classList.add('hidden');

  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  player0.classList.add('player--active');
};

startingConditions();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //Activate next player zone
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// roll die
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1-Generating a random die roll
    const die = dieValueGeneration();

    //2- Display die
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${die}.png`;

    //3-Check for rolled 1
    if (die !== 1) {
      // Add die to current score
      currentScore += die;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

//Hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player wins
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  startingConditions();
});