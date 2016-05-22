// Global variables
var word = document.getElementById('word'),
	wrongDiv = document.getElementById("wrong"),
	words = ['positronic', 'holodeck', 'disruptor', 'shields', 'data', 'enterprise', 'assimilated', 'ferengi', 'collective', 'federation', 'starfleet', 'transporter', 'phasers', 'android', 'klingon', 'romulan', 'orbit'],
	letterQuery = [''],
	guessed,
	placeholders = '',
	wordToGuess,
	wordLength,
	badGuesses,
	correctGuesses,
	guessesRemaining,
	gamesWon = 0,
	vidEnd = document.getElementById("video9"),
	vidEnd2 = document.getElementById("video10"),
	success = document.getElementById("over-success"),
	fail = document.getElementById("over-fail"),
	audio1 = document.getElementById("audio1"),
	audio2 = document.getElementById("audio2"),
	audio3 = document.getElementById("audio3"),
	vid1 = document.getElementById("video1"),
	vid2 = document.getElementById("video2"),
	vid3 = document.getElementById("video3"),
	vid4 = document.getElementById("video4"),
	vid5 = document.getElementById("video5"),
	vid6 = document.getElementById("video6"),
	vid7 = document.getElementById("video7"),
	vid8 = document.getElementById("video8"),
	vid9 = document.getElementById("video9"),
	vid10 = document.getElementById("video10"),
	vid11 = document.getElementById("video11");

// Starts a new game
function newGame(){
	letterQuery = [''];
	clearDiv();
	placeholders = '';
	success = '';
	fail = '';
	badGuesses = 0;
	correctGuesses = 0;
	guessesRemaining = 10;
	//select a random word
	wordToGuess = words[Math.floor(Math.random()*words.length)];
	wordLength = wordToGuess.length;
	// create row of underscores the same length as letters to guess
	for(var i = 0; i < wordLength; i++){
		placeholders += '_';
	}
	word.innerHTML = placeholders;
	//stops intro and plays initial video
	stopVid();
	playVid2();
	//detects key input and passes it to checker and pushes the letter to an array
	//also checks if the letter has already been picked
	document.onkeyup = function(event){
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		for(i = 0; i < letterQuery.length; i++){
			if(letter == letterQuery[i]){
				var guessed = true;
			}
		}
		if(!guessed){
				letterQuery.push(letter);
				console.log(letterQuery);
				checkLetter(letter);
			}
	}
}

// Check whether selected letter is in the word to be guessed
function checkLetter(letter){
	var newWrongDiv = document.createElement("span");
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
			// convert the array to a string and display it again
			word.innerHTML = placeholders.join('');
			//plays correct key sound
			playAudio1();

			//check number of guesses to decide which video to play
			if(correctGuesses == 1){
				stopVid();
				playVid6();
			}else if(correctGuesses == 4 && correctGuesses != wordLength){
				stopVid();
				playVid7();
			}else if(correctGuesses == 6 && correctGuesses != wordLength){
				stopVid();
				playVid8();
			}
			// check to see if game has been won
			else if(correctGuesses == wordLength){
				gamesWon++;
				clearDiv();
				stopVid();
				playVid9();
				document.getElementById("over-success").innerHTML = wordToGuess;
				vidEnd.addEventListener('ended', function(e) { 
					newGame();
				});
				// alert("You won! You guessed the word "+ wordToGuess + "." + " Play again.");
				// newGame();
			}
		}
	}
	// if the guess was incorrect, increment the number of bad
	// guesses and decides which video to play
	if(wrongGuess){
		newWrongDiv.innerHTML = letter;
		wrongDiv.appendChild(newWrongDiv);
		badGuesses++;

		//plays INcorrect key sound
		playAudio2();

		// checks to see which video to play
		if(guessesRemaining > 1){
			guessesRemaining--;
			if(badGuesses == 1 && correctGuesses == 0){
				stopVid();
				playVid3();
			}else if(badGuesses == 1 && correctGuesses > 0){
				stopVid();
				playVid4();
			}else if(badGuesses == 4){
				stopVid();
				playVid5();
			}else if(badGuesses == 7){
				stopVid();
				playVid8();
			}
		}else{
			clearDiv();
			document.getElementById("over-fail").innerHTML = wordToGuess;
			stopVid();
			playVid10();
			
			
			vidEnd2.addEventListener('ended', function(e) { 
				newGame();
			});
			// alert("You lose! The word was "+ wordToGuess + "." + " Try again.");
			// newGame();
		}
	}

	// Taking the tallies and displaying them in HTML
	var html = "<p>CORRECT: " + 
	correctGuesses + 
	"</p>" +
	"<p>INCORRECT: " + 
	badGuesses + 
	"</p>" +
	"<p>REMAINING: " + 
	guessesRemaining + 
	"</p>" +
	"<p>GAMES WON: " + 
	gamesWon + 
	"</p>";

	// Placing the html into the game ID
	document.querySelector('#game').innerHTML = html;
}

//clear the incorrect letters and guessed word
function clearDiv(){
  document.getElementById("wrong").innerHTML = "";
  document.getElementById("word").innerHTML = "";
  document.getElementById("over-fail").innerHTML = "";
  document.getElementById("over-success").innerHTML = "";
}

//play intro video and press key to start game
function initiate(){
	vid1.play();
	document.onkeyup = function(event){
		newGame();
	}
}

//hint function (not implemented yet)
function hint(){
	audio3.play();
}

//abort game
function abortGame(){
	clearDiv();
	stopVid();
	document.getElementById("video10").style.display = "block";
	vid10.play(); 
}

//plays correct key sound
function playAudio1() {
  audio1.play(); 
}

//plays INcorrect key sound
function playAudio2() {
  audio2.play(); 
}

//plays access denied sound
function playAudio3() {
  audio3.play(); 
}

//functions to play videos
function playVid2(){
	stopVid();
	document.getElementById("video2").style.display = "block";
	vid2.play(); 
}

function playVid3(){
	stopVid();
	document.getElementById("video3").style.display = "block";
	vid3.play(); 
}

function playVid4(){
	stopVid();
	document.getElementById("video4").style.display = "block";
	vid4.play(); 
}

function playVid5(){
	stopVid();
	document.getElementById("video5").style.display = "block";
	vid5.play(); 
}

function playVid6(){
	stopVid(); 
	document.getElementById("video6").style.display = "block";
	vid6.play(); 
}

function playVid7(){
	stopVid();
	document.getElementById("video7").style.display = "block";
	vid7.play(); 
}

function playVid8(){
	stopVid();
	document.getElementById("video8").style.display = "block";
	vid8.play(); 
}

function playVid9(){
	stopVid();
	document.getElementById("video9").style.display = "block";
	vid9.play(); 
}

function playVid10(){
	stopVid();
	document.getElementById("video10").style.display = "block";
	vid10.play(); 
}

// hide, pause and que videos
// done this way due to no stop function
function stopVid(){
	vid1.pause();
	vid1.load();
	document.getElementById("video1").style.display = "none";
	vid2.pause();
	vid2.load();
	document.getElementById("video2").style.display = "none";
	vid3.pause();
	vid3.load();
	document.getElementById("video3").style.display = "none";
	vid4.pause();
	vid4.load();
	document.getElementById("video4").style.display = "none";
	vid5.pause();
	vid5.load();
	document.getElementById("video5").style.display = "none";
	vid6.pause();
	vid6.load();
	document.getElementById("video6").style.display = "none";
	vid7.pause();
	vid7.load();
	document.getElementById("video7").style.display = "none";
	vid8.pause();
	vid8.load();
	document.getElementById("video8").style.display = "none";
	vid9.pause();
	vid9.load();
	document.getElementById("video9").style.display = "none";
	vid10.pause();
	vid10.load();
	document.getElementById("video10").style.display = "none";
}