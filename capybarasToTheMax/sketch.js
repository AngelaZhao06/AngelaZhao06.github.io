// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const circles = [{
  x:200, y:200, r:200 
}];

function preload() {
  //img = loadImage("capybara.jfif");
  createCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background("white");
  drawCircle(circles[0]);
  // splitCircle();
  // image(img, width/2, height/2); 
}

function drawCircle(circle){
  ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
}

function splitCircle(){
  for (let i = 0; i < circles.length; i ++){
    var splitcircle = circles[i];
    if (mouseX)
  }
  
}

// function mouseClicked(){
// }