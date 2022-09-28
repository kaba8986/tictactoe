let icons = ['apple', 'bananas', 'beer', 'car', 'circle', 'cloud', 'computer', 'dog', 'drink', 'earth', 'firstaid', 'glasses', 'moon', 'music', 'palm', 'ship', 'smiley', 'square', 'star', 'sun', 'tv', 'virus'];
let fields = [];
let currentShape = 'one';
let gameOver = false;
let playerOne;
let playerTwo;
let audioGameOver = new Audio('gameover.mp3');
let success = new Audio('success.mp3');
let menu = new Audio('menu.mp3');


/************ START GAME *****************/

function newGame() {
  playerOne = 'virus';
  playerTwo ='firstaid';
  resetGame();
  fillIconBox();
  showStartScreen();
}

function reloadGame() {
  resetGame();
  showGameScreen();
  setGameIcons();
}

function resetGame() {
  gameOver = false;
  currentShape = 'one';
  removeEndScreen();
  resetGameField();
  fields = [];
}

/************* HIDE / SHOW SCREENS & ICONS **********************/

function showStartScreen() {
  document.getElementById('choose-icon').classList.remove('dis-none');
  document.getElementById('start-new-game').classList.remove('dis-none');

}

function showGameScreen() {
  document.getElementById('player-panel').classList.remove('dis-none');
  document.getElementById('content').classList.remove('dis-none');
  document.getElementById('choose-icon').classList.add('dis-none');
  document.getElementById('start-new-game').classList.add('dis-none');
}

function removeEndScreen() {
  document.getElementById('gameover').style.opacity = '0';
  document.getElementById('gameover').classList.add('dis-none');
  document.getElementById('winner-output').classList.add('dis-none');
  document.getElementById('restart-game').classList.add('dis-none');
  document.getElementById('change-icons').classList.add('dis-none');
}

function gameOverScreen() {
  document.getElementById('gameover').style.opacity = '0.1';
  document.getElementById('gameover').classList.remove('dis-none');
  document.getElementById('content').classList.add('dis-none');
  document.getElementById('player-panel').classList.add('dis-none');
}

function newGameScreen() {
document.getElementById('restart-game').classList.remove('dis-none');
document.getElementById('change-icons').classList.remove('dis-none');
document.getElementById('winner-output').classList.remove('dis-none');
success.play();
}

function resetGameField() {
  for(let i = 1; i < 9; i++) {
    document.getElementById(`line-${i}`).style.transform = 'scale(0)';
    document.getElementById(`p1-icon-${i}`).classList.add('dis-none');
    document.getElementById(`p2-icon-${i}`).classList.add('dis-none');
  }
    document.getElementById(`p1-icon-0`).classList.add('dis-none');
    document.getElementById(`p2-icon-0`).classList.add('dis-none');
}

/************ SET ICON FUNCTIONS *****************/

function fillIconBox() {
  let box1 = document.getElementById('icon-box-1');
  let box2 = document.getElementById('icon-box-2');
  box1.innerHTML = '';
  box2.innerHTML = '';
  for(let i = 0; i < icons.length; i++) {
    box1.innerHTML += /*html*/ `<img class="icons-preview ${icons[i]}" id="${icons[i]}-1" src="./img/icons/${icons[i]}.svg" onclick="displayIcon('p1','${icons[i]}', ${i})">`
    box2.innerHTML += /*html*/ `<img class="icons-preview" ${icons[i]} id="${icons[i]}-2" src="./img/icons/${icons[i]}.svg" onclick="displayIcon('p2','${icons[i]}', ${i})">`
  }
}

function displayIcon(player, icon, index) {
  document.getElementById(`final-icon-${player}`).src = `./img/icons/${icon}.svg`;
  if(player == "p1") {
    playerOne = `${icon}`;
  } else {
    playerTwo = `${icon}`;
  }
}

function setGameIcons() {
  let icon1 = playerOne;
  let icon2 = playerTwo;

  for(let i = 0; i < 9; i++){
    document.getElementById(`p1-icon-${i}`).src = `./img/icons/${icon1}.svg`;
    document.getElementById(`p2-icon-${i}`).src = `./img/icons/${icon2}.svg`;
  }

  document.getElementById('profile-p1').src = `./img/icons/${icon1}.svg`;
  document.getElementById('profile-p2').src = `./img/icons/${icon2}.svg`;
}


/************ DRAWING FUNCTIONS *****************/

function fillShape(id) {
  if(fields[id]) {
    return
  }

  if(!fields[id] && !gameOver) {
    fields[id] = currentShape;
    if(currentShape == 'two') {
      currentShape = 'one';
    } else {
      currentShape = 'two';
    }
    draw();
    checkForWin();
  }
}

function draw() {
  for(let i = 0; i < fields.length; i++) {
    if(fields[i] == 'one') {
      document.getElementById(`p1-icon-${i}`).classList.remove('dis-none');
    } 
    if(fields[i] == 'two') {
      document.getElementById(`p2-icon-${i}`).classList.remove('dis-none');
    } 
  }
  changePlayer();
}

/************ CHECKING & CHANGING FUNCTIONS *****************/

function changePlayer() {
  document.getElementById('player-1').classList.toggle('player-inactive');
  document.getElementById('player-2').classList.toggle('player-inactive');
}

function checkForWin() {
  let winner;
  //first row
  if(fields[0] == fields[1] && fields[0] == fields[2] && fields[0]) {
    winner = fields[0];
    document.getElementById(`line-1`).style.transform = 'scaleX(1.0)';
  }
  //second row
  if(fields[3] == fields[4] && fields[3] == fields[5] && fields[3]) {
    winner = fields[3];
    document.getElementById(`line-2`).style.transform = 'scaleX(1.0)';
  }
  //third row
  if(fields[6] == fields[7] && fields[6] == fields[8] && fields[6]) {
    winner = fields[6];
    document.getElementById(`line-3`).style.transform = 'scaleX(1.0)';
  }
  //first column
  if(fields[0] == fields[3] && fields[0] == fields[6] && fields[0]) {
    winner = fields[0];
    document.getElementById(`line-4`).style.transform = 'rotate(90deg) scaleX(1.0)';
  }
  //second column
  if(fields[1] == fields[4] && fields[1] == fields[7] && fields[1]) {
    winner = fields[1];
    document.getElementById(`line-5`).style.transform = 'rotate(90deg) scaleX(1.0)';
  }
  //third column
  if(fields[2] == fields[5] && fields[2] == fields[8] && fields[2]) {
    winner = fields[2];
    document.getElementById(`line-6`).style.transform = 'rotate(90deg) scaleX(1.0)';
  }
  //diagonal leftup to rightdown
  if(fields[0] == fields[4] && fields[0] == fields[8] && fields[0]) {
    winner = fields[0];
    document.getElementById(`line-7`).style.transform = 'rotate(45deg) scaleX(1.2)';
  }
  //diagonal rightup to leftdown
  if(fields[2] == fields[4] && fields[2] == fields[6] && fields[2]) {
    winner = fields[2];
    document.getElementById(`line-8`).style.transform = 'rotate(-45deg) scaleX(1.2)';
  }
  if(winner) {
    gameOver = true;
    whoIsWinner();
    audioGameOver.play();
    setTimeout(gameOverScreen, 1400);
    setTimeout(newGameScreen, 3500);
  }
}

function whoIsWinner() {
  let output = document.getElementById('winner-output');
  if(currentShape == 'two') {
    output.innerHTML = 'player ONE win the game';
    output.style.color = '#00ffd0';
  } else {
    output.innerHTML = 'player TWO win the game';
    output.style.color = '#d900ff';
  }

}

