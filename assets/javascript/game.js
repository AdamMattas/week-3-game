// Global variables organized in an object
var hangman = {
  word: document.getElementById("word"),
  wrongDiv: document.getElementById("wrong"),
  alphabet: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ],
  words: [
    "DILITHIUM",
    "SHUTTLECRAFT",
    "DEFIANT",
    "VOYAGER",
    "VULCAN",
    "CARDASSIAN",
    "BAJORAN",
    "NEBULA",
    "GALAXY",
    "HUMANOID",
    "TRICORDER",
    "BETAZOID",
    "NEUTRON",
    "WORMHOLE",
    "ANDORIAN",
    "SUBSPACE",
    "POSITRONIC",
    "HOLODECK",
    "DISRUPTOR",
    "SHIELDS",
    "DATA",
    "ENTERPRISE",
    "ASSIMILIATED",
    "FERENGI",
    "COLLECTIVE",
    "FEDERATION",
    "STARFLEET",
    "TRANSPORTER",
    "PHASERS",
    "ANDROID",
    "KLINGON",
    "ROMULAN",
    "ORBIT",
    "PARADOX",
    "DIMENSION",
    "PHOTON"
  ],
  letterQuery: [""],
  guessed: "",
  placeholders: "",
  wordToGuess: "",
  wordLength: "",
  badGuesses: "",
  correctGuesses: "",
  guessesRemaining: "",
  gamesWon: 0,
  vidEnd: document.getElementById("video9"),
  vidEnd2: document.getElementById("video10"),
  vidAbort: document.getElementById("video11"),
  success: document.getElementById("over-success"),
  fail: document.getElementById("over-fail"),
  audio1: document.getElementById("audio1"),
  audio2: document.getElementById("audio2"),
  audio3: document.getElementById("audio3"),
  vid1: document.getElementById("video1"),
  vid2: document.getElementById("video2"),
  vid3: document.getElementById("video3"),
  vid4: document.getElementById("video4"),
  vid5: document.getElementById("video5"),
  vid6: document.getElementById("video6"),
  vid7: document.getElementById("video7"),
  vid8: document.getElementById("video8"),
  vid9: document.getElementById("video9"),
  vid10: document.getElementById("video10"),
  vid11: document.getElementById("video11"),

  // Starts a new game and maintains games won and resets guesses
  newGame: function() {
    hangman.letterQuery = [""];
    hangman.clearDiv();
    hangman.placeholders = "";
    hangman.success = "";
    hangman.fail = "";
    hangman.badGuesses = 0;
    hangman.correctGuesses = 0;
    hangman.guessesRemaining = 10;
    //select a random word
    hangman.wordToGuess =
      hangman.words[Math.floor(Math.random() * hangman.words.length)];
    hangman.wordLength = hangman.wordToGuess.length;
    // create row of underscores the same length as letters to guess
    for (var i = 0; i < hangman.wordLength; i++) {
      hangman.placeholders += "_";
    }
    hangman.word.innerHTML = hangman.placeholders;
    //stops intro and plays initial video
    hangman.stopVid();
    hangman.playVid2();
    //detects key input and passes it to checker and pushes the letter to an array
    //also checks if the letter has already been picked
    document.onkeyup = function(event) {
      var letter = String.fromCharCode(event.keyCode).toUpperCase();

      hangman.checkValid(letter);
    };

    //use actual keyboard to select letters
    document.getElementById("keyboard-icon").onclick = function showKeyboard() {
      var virtual = document.getElementById("keyboard");
      virtual.classList.toggle("hide");
    };

    //Use virtual keyboard to select letters
    document.getElementById("keyboard").onclick = function keyClick() {
      hangman.checkValid(event.target.id.toUpperCase());
    };
  },

  checkValid: function(letter) {
    console.log("CHECK VALID INVOKED");
    var guessed;

    if (hangman.alphabet.indexOf(letter) !== -1) {
      for (i = 0; i < hangman.letterQuery.length; i++) {
        if (letter === hangman.letterQuery[i]) {
          guessed = true;
        }
      }
      if (!guessed) {
        hangman.letterQuery.push(letter);
        console.log(hangman.letterQuery);
        hangman.checkLetter(letter);
      }
    }
  },

  // Check whether selected letter is in the word to be guessed
  checkLetter: function(letter) {
    var newWrongDiv = document.createElement("span");
    var placeholders = hangman.word.innerHTML,
      wrongGuess = true;
    // split the placeholders into an array
    placeholders = placeholders.split("");
    // loop through the array
    for (var i = 0; i < hangman.wordLength; i++) {
      // if the selected letter matches one in the word to guess,
      // replace the underscore and increase the number of correct guesses
      if (hangman.wordToGuess.charAt(i) == letter.toUpperCase()) {
        placeholders[i] = letter;
        wrongGuess = false;
        hangman.correctGuesses++;
        // convert the array to a string and display it again
        hangman.word.innerHTML = placeholders.join("");
        //plays correct key sound
        hangman.playAudio1();
        //check number of guesses to decide which video to play
        if (hangman.correctGuesses == 1) {
          hangman.stopVid();
          hangman.playVid6();
        } else if (
          hangman.correctGuesses == 4 &&
          hangman.correctGuesses != hangman.wordLength
        ) {
          hangman.stopVid();
          hangman.playVid7();
        } else if (
          hangman.correctGuesses == 6 &&
          hangman.correctGuesses != hangman.wordLength
        ) {
          hangman.stopVid();
          hangman.playVid8();
        }
        // check to see if game has been won and plays success video
        else if (hangman.correctGuesses == hangman.wordLength) {
          hangman.gamesWon++;
          hangman.clearDiv();
          hangman.stopVid();
          hangman.playVid9();
          //displays the correctly guessed word
          var success = document.getElementById("over-success");
          success.innerHTML = hangman.wordToGuess;
          success.classList.remove("hide");
          //listens for end of video before starting a new game
          hangman.vidEnd.addEventListener("ended", function(e) {
            hangman.newGame();
          });
        }
      }
    }
    // if the guess was incorrect, increment the number of bad
    // guesses and decides which video to play
    if (wrongGuess) {
      newWrongDiv.innerHTML = letter;
      hangman.wrongDiv.appendChild(newWrongDiv);
      hangman.badGuesses++;
      //plays INcorrect key sound
      hangman.playAudio2();
      // checks to see which video to play
      if (hangman.guessesRemaining > 1) {
        hangman.guessesRemaining--;
        if (hangman.badGuesses == 1 && hangman.correctGuesses == 0) {
          hangman.stopVid();
          hangman.playVid3();
        } else if (hangman.badGuesses == 1 && hangman.correctGuesses > 0) {
          hangman.stopVid();
          hangman.playVid4();
        } else if (hangman.badGuesses == 4) {
          hangman.stopVid();
          hangman.playVid5();
        } else if (hangman.badGuesses == 7) {
          hangman.stopVid();
          hangman.playVid8();
        }
      } else {
        hangman.clearDiv();
        //displays the word that the player failed to guess correctly
        //document.getElementById("over-fail").innerHTML = hangman.wordToGuess;
        var fail = document.getElementById("over-fail");
        fail.innerHTML = hangman.wordToGuess;
        fail.classList.remove("hide");
        //plays fail video
        hangman.stopVid();
        hangman.playVid10();
        //listens for end of video before starting a new game
        hangman.vidEnd2.addEventListener("ended", function(e) {
          hangman.newGame();
        });
      }
    }

    // Taking the tallies and displaying them in HTML
    var html =
      "<p>CORRECT: " +
      hangman.correctGuesses +
      "</p>" +
      "<p>INCORRECT: " +
      hangman.badGuesses +
      "</p>" +
      "<p>REMAINING: " +
      hangman.guessesRemaining +
      "</p>" +
      "<p>GAMES WON: " +
      hangman.gamesWon +
      "</p>";

    // Placing the html into the game ID
    document.querySelector("#game").innerHTML = html;
  },

  //clear the incorrect letters and guessed word
  clearDiv: function() {
    document.getElementById("wrong").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("over-fail").innerHTML = "";
    document.getElementById("over-fail").classList.add("hide");
    document.getElementById("over-success").innerHTML = "";
    document.getElementById("over-success").classList.add("hide");
  },

  //hint function (not implemented yet just plays audio)
  hint: function() {
    hangman.audio3.play();
  },

  //abort game and play fail video
  abortGame: function() {
    hangman.clearDiv();
    hangman.stopVid();
    document.getElementById("video11").style.display = "block";
    hangman.vid11.play();
    //listens for end of video and then reloads the page
    hangman.vidAbort.addEventListener("ended", function(e) {
      window.location.reload();
    });
  },

  //plays correct key sound
  playAudio1: function() {
    hangman.audio1.play();
  },

  //plays INcorrect key sound
  playAudio2: function() {
    hangman.audio2.play();
  },

  //plays access denied sound
  playAudio3: function() {
    hangman.audio3.play();
  },

  //functions to display and play videos one at a time
  playVid2: function() {
    hangman.stopVid();
    document.getElementById("video2").style.display = "block";
    hangman.vid2.play();
  },

  playVid3: function() {
    hangman.stopVid();
    document.getElementById("video3").style.display = "block";
    hangman.vid3.play();
  },

  playVid4: function() {
    hangman.stopVid();
    document.getElementById("video4").style.display = "block";
    hangman.vid4.play();
  },

  playVid5: function() {
    hangman.stopVid();
    document.getElementById("video5").style.display = "block";
    hangman.vid5.play();
  },

  playVid6: function() {
    hangman.stopVid();
    document.getElementById("video6").style.display = "block";
    hangman.vid6.play();
  },

  playVid7: function() {
    hangman.stopVid();
    document.getElementById("video7").style.display = "block";
    hangman.vid7.play();
  },

  playVid8: function() {
    hangman.stopVid();
    document.getElementById("video8").style.display = "block";
    hangman.vid8.play();
  },

  playVid9: function() {
    hangman.stopVid();
    document.getElementById("video9").style.display = "block";
    hangman.vid9.play();
  },

  playVid10: function() {
    hangman.stopVid();
    document.getElementById("video10").style.display = "block";
    hangman.vid10.play();
  },

  playVid11: function() {
    hangman.stopVid();
    document.getElementById("video11").style.display = "block";
    hangman.vid11.play();
  },

  // hide, pause and que videos
  // done this way due to no stop function
  stopVid: function() {
    hangman.vid1.pause();
    hangman.vid1.load();
    document.getElementById("video1").style.display = "none";
    hangman.vid2.pause();
    hangman.vid2.load();
    document.getElementById("video2").style.display = "none";
    hangman.vid3.pause();
    hangman.vid3.load();
    document.getElementById("video3").style.display = "none";
    hangman.vid4.pause();
    hangman.vid4.load();
    document.getElementById("video4").style.display = "none";
    hangman.vid5.pause();
    hangman.vid5.load();
    document.getElementById("video5").style.display = "none";
    hangman.vid6.pause();
    hangman.vid6.load();
    document.getElementById("video6").style.display = "none";
    hangman.vid7.pause();
    hangman.vid7.load();
    document.getElementById("video7").style.display = "none";
    hangman.vid8.pause();
    hangman.vid8.load();
    document.getElementById("video8").style.display = "none";
    hangman.vid9.pause();
    hangman.vid9.load();
    document.getElementById("video9").style.display = "none";
    hangman.vid10.pause();
    hangman.vid10.load();
    document.getElementById("video10").style.display = "none";
    hangman.vid11.pause();
    hangman.vid11.load();
    document.getElementById("video11").style.display = "none";
  }
};

//play intro video and press key to start game
//doesn't work due to chrome autoplay policy
function initiate() {
  document.onclick = function() {
    hangman.vid1.play();
  };

  document.onkeyup = function() {
    hangman.newGame();
  };

  //Use virtual keyboard to select letters
  document.getElementById("keyboard").onclick = function() {
    hangman.newGame();
  };

  //use actual keyboard to select letters
  document.getElementById("keyboard-icon").onclick = function showKeyboard() {
    var virtual = document.getElementById("keyboard");
    virtual.classList.toggle("hide");
  };
}
