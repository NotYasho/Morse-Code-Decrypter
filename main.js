body = document.querySelector('body');
h1 = document.querySelector('h1');
inputBox = document.querySelector('#input-box');
mute = document.querySelector('#mute');
translate = document.querySelector('#translate');

// Audio Files
const shortBeep = new Audio('audio\\short-beep.wav');
const longBeep = new Audio('audio\\long-beep.wav');
const space = new Audio('audio\\space.wav');
const backspace = new Audio('audio\\backspace.wav');

var pressed = 0;
var translated = [];
var code = [];

morseDict = {
	'-----'  : '0',
	'.----'  : '1',
	'..---'  : '2',
	'...--'  : '3',
	'....-'  : '4',
	'.....'  : '5',
	'-....'  : '6',
	'--...'  : '7',
	'---..'  : '8',
	'----.'  : '9',
	'.-'     : 'a',
	'-...'   : 'b',
	'-.-.'   : 'c',
	'-..'    : 'd',
	'.'      : 'e',
	'..-.'   : 'f',
	'--.'    : 'g',
	'....'   : 'h',
	'..'     : 'i',
	'.---'   : 'j',
	'-.-'    : 'k',
	'.-..'   : 'l',
	'--'     : 'm',
	'-.'     : 'n',
	'---'    : 'o',
	'.--.'   : 'p',
	'--.-'   : 'q',
	'.-.'    : 'r',
	'...'    : 's',
	'-'      : 't',
	'..-'    : 'u',
	'...-'   : 'v',
	'.--'    : 'w',
	'-..-'   : 'x',
	'-.--'   : 'y',
	'--..'   : 'z',
	'.-.-.-' : '.',
	'--..--' : ',',
	'..--..' : '?',
	'-.-.--' : '!',
	'-....-' : '-',
	'-..-.'  : '/',
	'.--.-.' : '@',
	'-.--.'  : '(',
	'-.--.-' : ')'
};

translate.addEventListener('click', function() {
	if (code.length > 0) {
		var codeString = code.join('');
		var characters = codeString.split(' ');

		// if the values of the character array are in the dictionary, then translate it
		for (i in characters) {
			if (characters[i] == '/') {
				console.log('space');
				translated.push(' ');
				continue;
			}
			if (morseDict[characters[i]]) {
				translated.push(morseDict[characters[i]]);
			}
		}

		transated = translated.join('');
		h1.innerText = transated;
	}
});

mute.addEventListener('click', function() {
	if (mute.innerHTML == 'Mute') {
		mute.innerHTML = 'Unmute';
		longBeep.muted = true;
		shortBeep.muted = true;
		space.muted = true;
	}
	else {
		mute.innerHTML = 'Mute';
		longBeep.muted = false;
		shortBeep.muted = false;
		space.muted = false;
	}
	mute.blur();
});

body.addEventListener('keydown', function(e) {
	if (
		(e.code == 'Space' && e.code == 'Enter') ||
		(e.code == 'NumpadEnter' && e.code == 'Backspace') ||
		(e.code == 'Delete' && e.code == 'Slash') ||
		e.code == 'NumpadDivide'
	)
		return;

	if (e.code == 'Slash' || e.code == 'NumpadDivide') {
		e.preventDefault();
		code.push(' / ');
		flash();
		h1.innerText = '/';
		space.play();
	}
	else if (e.code == 'Enter' || e.code == 'NumpadEnter') {
		e.preventDefault();
		code.push(' ');
		flash();
		h1.innerText = '☐';
		space.play();
	}
	else if (e.code == 'Backspace' || e.code == 'Delete') {
		code.pop();
		flash();
		h1.innerText = '⌫';
		backspace.play();
	}
	else if (e.code == 'Space') {
		pressed = e.timeStamp;
	}
	return (inputBox.value = code.join(''));
});

body.addEventListener('keyup', function(e) {
	if (e.code != 'Space') return;
	var duration = e.timeStamp - pressed;
	// If key is pressed for more than 150ms (0.15s)
	if (duration > 150) {
		flash();
		code.push('-');
		longBeep.play();
	}
	else {
		flash();
		code.push('.');
		shortBeep.play();
	}
	h1.innerText = code[code.length - 1];
	inputBox.value = code.join('');
	pressed = 0;
	return;
});

function flash() {
	h1.style.color = 'rgba(255, 255, 255, 0.464)';
	setTimeout(function() {
		h1.style.color = '#fff';
	}, 200);
	h1.style.color = 'rgba(255, 255, 255, 0.464)';
}
