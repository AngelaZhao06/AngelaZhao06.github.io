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
  x = windowWidth;
  y = windowHeight;
  d = 100;
  i = 1;
  a = 2;

}

function draw() {
  background("white");
  splitCircle();
  // image(img, width/2, height/2); 
}

function splitCircle(){
  while (i > a){
    circle( x/2, y/2, windowHeight*0.75);
    i ++;
  }
  


}

function mouseClicked(){
}