// Inspired by https://codepen.io/cathydutton/
window.onload = function () {

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];

  const lettersSound = ["sound/A.wav", "sound/B.wav", "sound/C.wav", "sound/D.wav", "sound/E.wav", 
  "sound/F.wav", "sound/G.wav", "sound/H.wav", "sound/I.wav", "sound/J.wav", "sound/K.wav", 
  "sound/L.wav", "sound/M.wav", "sound/N.wav", "sound/O.wav", "sound/P.wav", "sound/Q.wav", 
  "sound/R.wav", "sound/S.wav", "sound/T.wav", "sound/U.wav", "sound/V.wav", "sound/W.wav", 
  "sound/X.wav", "sound/Y.wav", "sound/Z.wav", "sound/Å.wav", "sound/Ä.wav", "sound/Ö.wav"]

  
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
        let audio = new Audio();
        audio.src = 'sound/d.wav'
        audio.play();
      } 
    }
    var j = (word.indexOf(guess));
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
      let audio = new Audio();
  audio.src = 'sound/k.wav'
  audio.play();
    } else {
      comments();
    }
  }
}

//var buttons = function (letters, index) {
  function buttons(letterz, index){

var audio = new Audio();

    var playAudio = function() {     
      console.log('spelar ljud..');
      audio.src = lettersSound[index];
      audio.play();
    }

    var stopAudio = function() {
      console.log('stoppar ljud..');
      audio.pause();
      audio.currentTime = 0;
    }

  myButtons = document.getElementById('buttons');
  letters = document.createElement('ul');
    letters.id = 'alphabet';
      list = document.createElement('li');
      list.innerHTML = letterz;
      list.addEventListener('mouseover', playAudio);
      list.addEventListener('mouseout', stopAudio);
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list); 
      
      // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    let audio = new Audio();
		audio.src = 'sound/e.wav'
    audio.play();
    play();
  
  }

}
alphabet.forEach(buttons);

  


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
      let audio = new Audio();
		audio.src = 'sound/f.wav'
    audio.play();
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "Du vann!";
        let audio = new Audio();
		audio.src = 'sound/c.wav'
    audio.play();

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
    let audio = new Audio();
		audio.src = 'sound/e.wav'
    audio.play();
  };

  
}




