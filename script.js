let fields = [];
let currentShape = 'cross';
let gameOver = false;

function restartGame() {
  gameOver = false;
  currentShape = 'cross';

  document.getElementById('gameover').style.opacity = '0';
  document.getElementById('gameover').style.display = 'none';
  document.getElementById('new-game').style.display = 'none';
  document.getElementById('content').style.display = 'block';
  document.getElementById('player-panel').style.display = 'flex';

  resetLines();
  resetShapes();
  fields = [];
}



function fillShape(id) {
  if(fields[id]) {
    return
  }

  if(!fields[id] && !gameOver) {
    fields[id] = currentShape;
    if(currentShape == 'cross') {
      currentShape = 'circle';
    } else {
      currentShape = 'cross';
    }
    draw();
    checkForWin();
  }
}

function draw() {
  for(let i = 0; i < fields.length; i++) {
    if(fields[i] == 'circle') {
      document.getElementById(`circle-${i}`).classList.remove('dis-none');
    } 

    if(fields[i] == 'cross') {
      document.getElementById(`cross-${i}`).classList.remove('dis-none');
    } 
  }
  changePlayer();
}

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
    /*
    setTimeout(gameOverScreen, 1400);
    setTimeout(newGameScreen, 4000);
    */
  }
}

function resetLines() {
  for(let i = 1; i < 9; i++) {
    document.getElementById(`line-${i}`).style.transform = 'scale(0)';
    console.log('hallo');
  }
}

function resetShapes() {
  for(let i = 0; i < 9; i++) {
    document.getElementById(`circle-${i}`).classList.add('dis-none');
    document.getElementById(`cross-${i}`).classList.add('dis-none');
  }
}


function gameOverScreen() {
    document.getElementById('gameover').style.opacity = '1';
    document.getElementById('gameover').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    document.getElementById('player-panel').style.display = 'none';
}

function newGameScreen() {
  document.getElementById('new-game').style.opacity = '1';
  document.getElementById('new-game').style.display = 'block';
}

