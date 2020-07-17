// -----------------------------------------------------------------
// How To Write Simon Slams
// -----------------------------------------------------------------
//
// This game needs a random number to be chosen and then pushed to
// an array.
//
// That array then needs to be played by the computer on the buttons.
//
// Then the player has to match that array or the game ends.
// If the player successfully matches the array then the computer
// goes back and chooses another random number and pushes it to
// the array. The player then has to repeat the array just like
// before except now there are two numbers in the array.
//
// The game goes on like this until 10 signals (numbers) are in the
// array and the player matches them all in order not waiting longer
// than 5 seconds in between each signal.
//
// If at any point in the game the player fails to match the pattern
// of signals or waits longer than 5 seconds in between pressing the
// squares the game ends and Simon insults the player. The game goes
// back to how it was on loading.
//
// If player wins then Simon congratulates you instead and the game
// goes back to how it was on loading.

// -----------------------------------------------------------------
// Variables
// -----------------------------------------------------------------

let number;
let computerPattern = [];
let playerPattern = [];
let userClick = 0;
let turnCounter = 0;

let context = new AudioContext();
let oscillator;

let start = document.querySelector('.start');
let gameBoard = document.querySelector('.gameBoard');

// -----------------------------------------------------------------
// Functions
// -----------------------------------------------------------------

start.addEventListener('click', handleStartButton);
function handleStartButton() {
	computerPattern = [];
	addOne();
}

// This game needs a random number to be chosen and then pushed to the computerPattern array.

function randomNumber() {
	number = Math.floor(Math.random() * 4 + 1);
	return number;
}

function addOne() {
	computerPattern.push(randomNumber());
	pressSquare();
}

// That array then needs to be played by the computer on the buttons.

function pressSquare() {
	let j = 0;
	const timer = setInterval(function () {
		document
			.querySelector(`.box${computerPattern[j]}`)
			.classList.add(`layer${computerPattern[j]}`);
		setTimeout(function () {
			document
				.querySelector(`.box${computerPattern[j - 1]}`)
				.classList.remove(`layer${computerPattern[j - 1]}`);
		}, 1000);
		j++;
		if (j >= computerPattern.length) {
			clearInterval(timer);
		}
	}, 1500);
}

// This part handles the effect of the squares lighting up as the player presses them and also builds the playerPattern array.

gameBoard.addEventListener('click', handleClick);

function handleClick(event) {
	if (event.target.classList.contains('box1')) {
		document.querySelector('.box1').classList.add('layer1');
		setTimeout(function () {
			document.querySelector('.box1').classList.remove('layer1');
		}, 500);
		playerPattern.push(1);
	} else if (event.target.classList.contains('box2')) {
		document.querySelector('.box2').classList.add('layer2');
		setTimeout(function () {
			document.querySelector('.box2').classList.remove('layer2');
		}, 500);
		playerPattern.push(2);
	} else if (event.target.classList.contains('box3')) {
		document.querySelector('.box3').classList.add('layer3');
		setTimeout(function () {
			document.querySelector('.box3').classList.remove('layer3');
		}, 500);
		playerPattern.push(3);
	} else if (event.target.classList.contains('box4')) {
		document.querySelector('.box4').classList.add('layer4');
		setTimeout(function () {
			document.querySelector('.box4').classList.remove('layer4');
		}, 500);
		playerPattern.push(4);
	}
	userClick++;
	if (userClick === turnCounter + 1) {
		check();
	}
}

// This part is where the playerPattern array is checked against the computerPattern array.

function check() {
	if (playerPattern.toString() !== computerPattern.toString()) {
		loseGame();
	} else if (playerPattern.toString() === computerPattern.toString()) {
		playerPattern = [];
		userClick = 0;
		turnCounter++;
		addOne();
	}
	if (turnCounter === 5) {
		winGame();
	}
}

// This part is where the game ends in either defeat or victory.

function loseGame() {
	alert('That was pitiful!');
}

function winGame() {
	alert('👏 Great job! You won!');
	return;
}

// This part is where the oscillator is set up to play the sounds on the squares.

function startOsc(frequency) {
	oscillator = context.createOscillator();
	oscillator.type = 'square';
	oscillator.frequency.value = frequency;
	oscillator.start(0);

	oscillator.connect(context.destination);
}

function stopOsc() {
	oscillator.stop(0);
	oscillator.disconnect();
}

// This part lets each square have it's own unique tone when the player presses them.

gameBoard.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(event) {
	if (event.target.classList.contains('box1')) {
		startOsc(164.8);
	} else if (event.target.classList.contains('box2')) {
		startOsc(220.0);
	} else if (event.target.classList.contains('box3')) {
		startOsc(277.2);
	} else if (event.target.classList.contains('box4')) {
		startOsc(329.6);
	}
}

gameBoard.addEventListener('mouseup', handleMouseUp);

function handleMouseUp(event) {
	if (event.target.classList.contains('box')) {
		stopOsc();
	}
}