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

function setup() {
  createCanvas(windowWidth, windowHeight);
  // checkeredGrid = checkeredArray(COLS, ROWS);
  minesGrid = createRandom2dArray(COLS, ROWS);
}

function draw() {
  background(220);
  displayGrid(minesGrid);
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
      // stroke("#A2D149");
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

// function checkeredArray(COLS, ROWS) {
//   let emptyArray = [];
//   let white = true;
//   for (let y=0; y<ROWS; y++) {
//     emptyArray.push([]);
//     for (let x=0; x<COLS; x++) {
//       if (white === true) {
//         emptyArray[y].push(0);
//         white =! white;
//       }
//       else {
//         emptyArray[y].push(1);
//         white = true;
//       }
//     }
//     white =! white;
//   }
//   return emptyArray;
// }

// function create2dArray(COLS, ROWS) {
//   let emptyArray = [];
//   for (let y=0; y<ROWS; y++) {
//     emptyArray.push([]);
//     for (let x=0; x<COLS; x++) {
//       emptyArray[y].push(0);
//     }
//   }
//   return emptyArray;
// }
function displayNumbersAroundMines(grid) {
  let displayNumbersAroundMines = createRandom2dArray(COLS, ROWS);

  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      let neighbours = 0;

      //look at all cells around this one...
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          //edge case check
          if (y+i >= 0 && y+i < ROWS && x+j >= 0 && x+j < COLS) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //don't count self!
      neighbours -= grid[y][x];

      //apply rules
      if (grid[y][x] === 1) { //alive
        if (neighbours === 2 || neighbours === 3) {
          displayNumbersAroundMines[y][x] = 1;
        }
        else {
          displayNumbersAroundMines[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) { //dead
        if (neighbours === 3) {
          displayNumbersAroundMines[y][x] = 1;
        }
        else {
          displayNumbersAroundMines[y][x] = 0;
        }
      }
    }
  }

  return displayNumbersAroundMines;
}