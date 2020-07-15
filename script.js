// -----------------------------------------------------------------
// How To Play Simon Slams
// -----------------------------------------------------------------
//
// Object of Game: Correctly repeat longer and longer sequences
//				   of signals.
//
// 1-Player Game
//
// 1. Press the start button.
// 2. Simon will give the first signal. Repeat the signal by
//    pressing the same color square.
// 3. Simon will duplicate the first signal and add one. Repeat
//    these two signals by pressing the same color squares,
//    in order.
// 4. Simon will duplicate these first two signals and add one.
// 5. Continue playing as long as you can repeat each sequence
//    of signals correctly.
// 6. If you fail to repeat a sequence exactly, or if you take
//    more than 5 seconds to repeat a signal, Simon responds with
//    an insult and the game ends.
//
// How To Win
//
// Repeat 10 sequences and Simon will actually compliment and
// congratulate you. I know, right?! (Sorta-Secret Bonus: If you
// win 3 games in a row you'll make Simon cry!)
//
// 2 or More Player Game
//
// Players may team up against Simon or compete with each other.
//
// 1. Decide who goes first.
// 2. Play proceeds as described above except players take turns
//    repeating Simon's signals.

// -----------------------------------------------------------------
// How To Write The Dang Game
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
// THE CODE
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// Variables
// -----------------------------------------------------------------

// let start; = true or false
// let turn; = a number
let number;
let computerPattern = [];
let playerPattern = [];
// let win; = true or false 
// let match; = true or false

// -----------------------------------------------------------------
// Functions
// -----------------------------------------------------------------

let start = document.querySelector('.start');
start.addEventListener('click', handleStartButton);
function handleStartButton() {
	computerPattern = [];
	addOne();
	
	console.log(computerPattern);
}

// This game needs a random number to be chosen and then pushed to
// an array.
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
	let gameBoard = document.querySelector('.gameBoard');
	// document.querySelector('.box1').style.backgroundColor = "white";
	for (let i = 0; i < computerPattern.length; i++) {
		// document.querySelector(`.box${i + 1}`).style.backgroundColor = 'white';
		document
			.querySelector(`.box${computerPattern[i]}`)
			.classList.add(`layer${computerPattern[i]}`);
		setTimeout(function () {
			// document.querySelector(`.box${i + 1}`).style.backgroundColor = "white";
			document
				.querySelector(`.box${computerPattern[i]}`)
				.classList.remove(`layer${computerPattern[i]}`);
		}, 1000);
	}
}

// Then the player has to match that array or the game ends.
// If the player successfully matches the array then the computer
// goes back and chooses another random number and pushes it to
// the array. The player then has to repeat the array just like
// before except now there are two numbers in the array.

// This part is just the action of pressing the buttons
let gameBoard = document.querySelector('.gameBoard');

gameBoard.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(event) {
	console.log(event.target);

	if (event.target.classList.contains('box1')) {
		document.querySelector('.box1').classList.add('layer1');
		setTimeout(function () {
			document.querySelector('.box1').classList.remove('layer1');
		}, 2000);
		playerPattern.push(1);
		// startOsc(164.8);
	} else if (event.target.classList.contains('box2')) {
		document.querySelector('.box2').classList.add('layer2');
		setTimeout(function () {
			document.querySelector('.box2').classList.remove('layer2');
		}, 2000);
		playerPattern.push(2);
		// startOsc(220.0);
	} else if (event.target.classList.contains('box3')) {
		document.querySelector('.box3').classList.add('layer3');
		setTimeout(function () {
			document.querySelector('.box3').classList.remove('layer3');
		}, 2000);
		playerPattern.push(3);
		// startOsc(277.2);
	} else if (event.target.classList.contains('box4')) {
		document.querySelector('.box4').classList.add('layer4');
		setTimeout(function () {
			document.querySelector('.box4').classList.remove('layer4');
		}, 2000);
		playerPattern.push(4);
		// startOsc(329.6);
	}
	check();
}

// gameBoard.addEventListener('mouseup', handleMouseUp);

// function handleMouseUp(event) {
// 	if (event.target.classList.contains('box')) {
// 		stopOsc();
// 	}
// }

// This part is where the buttons pressed are checked against the computer array
function check() {
	
	console.log(playerPattern);
	console.log(computerPattern);
	if (playerPattern.toString() !== computerPattern.toString()) {
		loseGame();
		
	} else if (playerPattern.toString() === computerPattern.toString()) {

		addOne();
	} else {
		winGame()
	}
playerPattern = [];
}

// function check() {
// 	if (playerPattern !== computerPattern) {
// 		match = false;
// 		loseGame();
// 	}
// 	if (playerPattern === computerPattern) {
// 		match = true;
// 		addOne();
// 	}
// 	if (playerPattern === computerPattern && turn === 10) {
// 		winGame();
// 	}
// }

function winGame() {
	alert('Great job! You won!');
	// return;
}

function loseGame() {
	alert('Game over, man!');
	// return;
}

// Audio Stuff

// Green
// E3
// 164.8

// Red
// A3
// 220.0

// Yellow
// C#4
// 277.2

// Blue
// E4
// 329.6

// Game end tone
// A0
// 27.5

// D0
//

// B0
//

// const context = new AudioContext();
// let oscillator;
// let gain;

// function startOsc(frequency) {
// 	oscillator = context.createOscillator();
// 	oscillator.type = 'square';
// 	oscillator.frequency.value = frequency;
// 	oscillator.start(0);

// 	oscillator.connect(context.destination);

// 	gain = context.createGain();
// 	gain.gain.value = 1;

// 	oscillator.connect(gain);
// 	gain.connect(context);
// }

// function stopOsc() {
// 	oscillator.stop(0);
// 	oscillator.disconnect();
// }

// -----------------------------------------------------------------
// References
// -----------------------------------------------------------------
//
// Awesome audio stuff learned in part through:
// https://marcgg.com/blog/2016/11/01/javascript-audio/
// https://middleearmedia.com/web-audio-api-basics/
// https://middleearmedia.com/web-audio-api-oscillators/
// https://middleearmedia.com/controlling-web-audio-api-oscillators/
