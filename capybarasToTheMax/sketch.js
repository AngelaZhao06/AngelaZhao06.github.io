// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let img;
let x, y, d;
let i, a;

function preload() {
  img = loadImage("capybara.jfif");
  createCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  x = windowWidth/2;
  y = windowHeight/2;
  d = windowHeight*0.75;

}

function draw() {
  background("white");
  splitCircle();
  // image(img, width/2, height/2); 
}

function splitCircle(){
  for (i = 1; i < 2; i ++){
    circle(x)
  }
  
}

function mouseClicked(){
}