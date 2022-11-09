// Minesweeper 
// Angela Zhao 
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 18;
const COLS = 18;
let checkeredGrid;
let minesGrid;
let cellWidth = 50;
let cellHeight = 50;
let mines;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // checkeredGrid = checkeredArray(COLS, ROWS);
  minesGrid = createRandom2dArray(COLS, ROWS);
  checkeredGrid = checkeredArray(COLS, ROWS);
}

function draw() {
  background(220);
  displayGrid(checkeredGrid);
  checkMines(minesGrid);
  
}


function displayGrid(grid) {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        fill("#A2D149");
      }
      else if (grid[y][x] === 1) {
        fill("#000000");
      } 
      stroke("#A2D149");
      rect(x*cellWidth + width/3.5 , y*cellHeight + 50, cellWidth, cellHeight);

    }
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

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function checkMines(grid) {
  
  for (let y=0; y<ROWS; y++) {
    for (let x =0; x<COLS; x++) {
      let mines = 0;
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          if (y+i >= 0 && y+i < ROWS && x+j >= 0 && x+j < COLS) {
            mines += grid[y+i][x+j];
          }
        }
      }
      mines -= grid[y][x];
      textSize(30);
      
      if(grid[y][x]=== 1){
        fill("red");
        text("❄︎", x*cellWidth + width/3.5 + 13 , y*cellHeight + 90);
      }
      else {
        fill("red");
        text(mines, x*cellWidth + width/3.5 + 13 , y*cellHeight + 90);
      } 
    }
  } 
} 


function checkeredArray(COLS, ROWS) {
  let emptyArray = [];
  let white = true;
  for (let y=0; y<ROWS; y++) {
    emptyArray.push([]);
    for (let x=0; x<COLS; x++) {
      if (white === true) {
        emptyArray[y].push(0);
        white =! white;
      }
      else {
        emptyArray[y].push(1);
        white = true;
      }
    }
    white =! white;
  }
  return emptyArray;
}
 

