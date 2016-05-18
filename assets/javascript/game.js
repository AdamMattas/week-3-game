// Global variables
var word = document.getElementById('word'),
	wrongDiv = document.getElementById("wrong"),
	words = ['positronic', 'holodeck', 'disruptor', 'shields', 'data', 'enterprise', 'assimilated', 'ferengi'],
	placeholders = '',
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses,
	guessesRemaining,
	gamesWon = 0;

// Start new game
function newGame(){
	var word = document.getElementById('word');
	clearDiv();
	placeholders = '';
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
	document.onkeyup = function(event){
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		checkLetter(letter);
	}
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter){
	var newWrongDiv = document.createElement("div");
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
				clearDiv();
				newGame();
			}
		}
	}
	// if the guess was incorrect, increment the number of bad
	// guesses and redraw the canvas
	if(wrongGuess){
		newWrongDiv.innerHTML = letter;
		wrongDiv.appendChild(newWrongDiv);
		badGuesses++;
		if(guessesRemaining > 1){
			guessesRemaining--;
		}else{
			alert("You lose! The word was "+ wordToGuess + "." + " Try again.");
			clearDiv();
			newGame();
		}
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

function clearDiv(){
    document.getElementById("wrong").innerHTML = "";
    document.getElementById("word").innerHTML = "";
}