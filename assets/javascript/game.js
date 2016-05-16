// Global variables
var word = document.getElementById('word'),
	letters = document.getElementById('letters'),
	words = ['positronic', 'holodeck', 'disruptor', 'shields', 'data', 'enterprise', 'assimiliated', 'ferengi'],
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses,
	guessesRemaining,
	gamesWon = 0;

// Start new game
function newGame(){
	var placeholders = '';
	badGuesses = 0;
	correctGuesses = 0;
	guessesRemaining = 10;
	wordToGuess = words[Math.floor(Math.random()*words.length)];
	wordLength = wordToGuess.length;
	// create row of underscores the same length as letters to guess
	for(var i = 0; i < wordLength; i++){
		placeholders += '_';
	}
	word.innerHTML = placeholders;
	//letters.innerHTML = '';
	document.onkeyup = function(event){
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		checkLetter(letter);
	}
}

// Get selected letter and remove it from the alphabet pad
function getLetter(){
	checkLetter(this.innerHTML);
	this.innerHTML = '&nbsp;';
	this.style.cursor = 'default';
	this.onclick = null;
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter){
	var placeholders = word.innerHTML,
	    wrongGuess = true;
	// split the placeholders into an array
	placeholders = placeholders.split('');
	// loop through the array
	for(var i = 0; i < wordLength; i++){
		// if the selected letter matches one in the word to guess,
		// replace the underscore and increase the number of correct guesses
		if(wordToGuess.charAt(i) == letter.toLowerCase()){
			placeholders[i] = letter;
			wrongGuess = false;
			correctGuesses++;
			// check to see if game has been won
			if(correctGuesses == wordLength){
				gamesWon++;
				alert("You won! You guessed the word "+ wordToGuess + "." + " Play again.");
				newGame();
			}
		}
	}
	// if the guess was incorrect, increment the number of bad
	// guesses and redraw the canvas
	if(wrongGuess){
		badGuesses++;
		if(guessesRemaining > 1){
			guessesRemaining--;
		}else{
			alert("You lose! The word was "+ wordToGuess + "." + " Try again.");
			newGame();
		}
		//drawCanvas();
	}
	// convert the array to a string and display it again
	word.innerHTML = placeholders.join('');

	// Taking the tallies and displaying them in HTML
	var html = "<p>Correct Guesses: " + 
	correctGuesses + 
	"</p>" +
	"<p>Wrong Guesses: " + 
	badGuesses + 
	"</p>" +
	"<p>Guesses Remaining: " + 
	guessesRemaining + 
	"</p>" +
	"<p>Games Won: " + 
	gamesWon + 
	"</p>";

	// Placing the html into the game ID
	document.querySelector('#game').innerHTML = html;
}