// Inspired by https://codepen.io/cathydutton/
window.onload = function () {

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];

  const lettersSound = [src="sound/a.wav", src="sound/b.wav", src="sound/c.wav", src="sound/d.wav", src="sound/e.wav",
    src="sound/f.wav", src="sound/g.wav", src="sound/h.wav", src="sound/i.wav", src="sound/j.wav", src="sound/k.wav",
    src="sound/l.wav", src="sound/m.wav", src="sound/n.wav", src="sound/o.wav", src="sound/p.wav", src="sound/q.wav",
    src="sound/r.wav", src="sound/s.wav", src="sound/t.wav", src="sound/u.wav", src="sound/v.wav", src="sound/w.wav",
    src="sound/x.wav", src="sound/y.wav", src="sound/z.wav", src="sound/å.wav", src="sound/ä.wav", src="sound/ö.wav" ]

  
  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showcategory = document.getElementById("category");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
  
  
  //mouse over buttons sound

var audio = function triggerMouseOver() {
    myaudio = document.getElementById('audio');
    lettersSound
    audio.play();

} 
  
  // Select category
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      categoryName.innerHTML = "Träd";
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "Bär";
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "Bestick";
    }
  }

  // Create guesses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "Du har " + lives + " liv";
    if (lives < 1) {
      showLives.innerHTML = "Slut på gissningar";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "Du vann!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 4;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
      context.lineWidth = 2;
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
     context.lineWidth = 8;
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
     context.lineWidth = 6;
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
     context.lineWidth = 2;
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
     context.lineWidth = 4;
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
     context.lineWidth = 2;
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
     context.lineWidth = 2;
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
     context.lineWidth = 2;
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
     context.lineWidth = 4;
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
     context.lineWidth = 4;
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["BJÖRK"],
        ["BLÅBÄR"],
        ["SKED"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Har näver"],
        ["Björnar tycker om dessa"],
        ["Passar till soppa"]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Tips: " +  hints [categoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}


