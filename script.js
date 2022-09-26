let fields = [];
let currentShape = 'cross';

function fillShape(id) {
  if(fields[id]) {
    return
  }
  fields[id] = currentShape;
  if(currentShape == 'cross') {
    currentShape = 'circle';
  } else {
    currentShape = 'cross';
  }
  draw();
  checkForWin();
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
  if(fields[0] == fields[1] && fields[0] == fields[2] && fields[0]) {
    winner = fields[0];
  }
  if(fields[3] == fields[4] && fields[3] == fields[5] && fields[3]) {
    winner = fields[3];
  }
  if(fields[6] == fields[7] && fields[6] == fields[8] && fields[6]) {
    winner = fields[6];
  }
  if(fields[0] == fields[3] && fields[0] == fields[6] && fields[0]) {
    winner = fields[0];
  }
  if(fields[1] == fields[4] && fields[1] == fields[7] && fields[1]) {
    winner = fields[1];
  }
  if(fields[2] == fields[3] && fields[2] == fields[8] && fields[2]) {
    winner = fields[2];
  }
  if(fields[0] == fields[4] && fields[0] == fields[8] && fields[0]) {
    winner = fields[0];
  }
  if(fields[2] == fields[4] && fields[2] == fields[6] && fields[2]) {
    winner = fields[2];
  }
  if(winner) {
    console.log('GEWONNEN!', winner);
  }
}
