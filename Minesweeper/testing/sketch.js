// Minesweeper 
// Angela Zhao 
// Date
//
// Extra for Experts:
// Using video tutorials from "The Coding Train" https://www.youtube.com/watch?v=LFU5ZlrR21E&t=709s &  "Code with Ania Kubów", I leared OOP and continue.
// I also included images of mines. There is a function to detect if there is a win but it may be faulty.
// You should be able to place flags using rightclick, placeFlag was working previously but that seems to have changed
let grid;
let checkerboard;
const COLS = 16;
const ROWS = 16;
let cellsize;

let mines = 50;
let totalUnopenCells = COLS*ROWS;

class Cell {
  constructor(i, j, cellsize) {
    this.i = i;
    this.j = j;
    this.x = i * cellsize;
    this.y = j * cellsize;
    this.cellsize = cellsize;
    this.neighborCount = 0;

    this.mine = false;
    this.flag = false;
    this.revealed = false;
  }
  // show the board
  show() {
    stroke(0);
    fill("#A2D149");
    rect(this.x, this.y, this.cellsize, this.cellsize);
    if (this.revealed) {
      if (this.mine) {
        image(bombSprite, this.x + this.cellsize/3.6, this.y + this.cellsize/3.7, this.cellsize/2, this.cellsize/2 );
      } else {
        fill("#8ECC39");
        rect(this.x, this.y, this.cellsize, this.cellsize);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.cellsize * 0.5, this.y + this.cellsize/1.5);
        }
      }
    }
  }

  countmines() {
    if (this.mine) {
      this.neighborCount = -1;
      return;
    }
    let total = 0;
    for (let xoff = -1; xoff <= 1; xoff++) {
      let i = this.i + xoff;
      if (i < 0 || i >= COLS) continue;

      for (let yoff = -1; yoff <= 1; yoff++) {
        let j = this.j + yoff;
        if (j < 0 || j >= ROWS) continue;

        let neighbor = grid[i][j];
        if (neighbor.mine) {
          total++;
        }
      }
    }
    this.neighborCount = total;
  }

  contains(x, y) {
    return (
      // check to see if the mouse inside the cell
      x > this.x && x < this.x + this.cellsize && y > this.y && y < this.y + this.cellsize
    );
  }

  reveal() {
    this.revealed = true;
    totalUnopenCells -= 0.5; // if cell is revealed,suntract from total cells still unopened
    if (this.neighborCount == 0) {
      // if cell is 0/empty, will show all neighnouring empty cells that aren't mines
      this.floodFill();
    }
  }

  placeFlag(){
    this.flag = true;
    if (this.revealed === false){
      if(this.flag){
        fill(0);
        image(flagSprite, this.x + this.cellsize/3.6, this.y + this.cellsize/3.6, this.cellsize/2, this.cellsize/2 );
      }
    }
  }

  floodFill() {
    for (let xoff = -1; xoff <= 1; xoff++) {
      let i = this.i + xoff;
      if (i < 0 || i >= COLS) continue;

      for (let yoff = -1; yoff <= 1; yoff++) {
        let j = this.j + yoff;
        if (j < 0 || j >= ROWS) continue;

        let neighbor = grid[i][j];
        if (!neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
}

function preload(){
  bombSprite = loadImage("mine.png");
  flagSprite = loadImage("flag.png");
  vineBoom = loadSound("vineBoom.m4a");
}

function setup() {
  if(windowHeight < windowWidth){
    cellsize = floor(windowHeight/20);
  }
  else {
    cellsize = floor(windowWidth/20);
  }
  createCanvas(ROWS*cellsize, COLS*cellsize);
  grid = make2dArray(COLS, ROWS);
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j] = new Cell(i, j, cellsize);
    }
  }

  // Pick mines spots
  let options = [];
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < mines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].mine = true;
  }

  for (var i = 0; i < COLS; i++) {
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].countmines();
    }
  }
  
}

function draw() {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j].show();
    }
  }
  if (mouseButton === RIGHT) {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].placeFlag();
          }
        }
      }
    }
  gameWon();
  }

function make2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function windowResized() {
  setup();
}

function mousePressed() {
if (mouseButton === LEFT) {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
        if (grid[i][j].mine) {
          gameOver();
        }
      }
    }
  }
}

}

function gameOver() {
  vineBoom.play();
  for (var i = 0; i < COLS; i++) { // reveal all cells
    for (var j = 0; j < ROWS; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function gameWon(){ 
  if (totalUnopenCells === mines){ // game is won if total unopen cells is the same number as mines
    text("YOU WIN!",width/2, height/0.5);
  }
}

function makeCheckerBoard(COLS, ROWS, cellsize){
  let lime = true;
  for (let y = 0; y < COLS; y++) {
    for (let x = 0; x < ROWS; x++) {
      if (lime) {
        fill("#A2D149");
      }
      else {
        fill("#8ECC39");
      }
      rect(x*cellsize, y* cellsize, cellsize,  cellsize);
      lime = !lime;
    }
    lime = !lime;  //flip boolean in between rows
  }
}

function createRandom2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      if (random(100) < 20) {
        emptyArray[y].push(1);
      }
      else {
        emptyArray[y].push(0);
      }
    }
  }
  return emptyArray;
}
