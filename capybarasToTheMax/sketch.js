// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circles;
let circle_1, circle_2, circle_3, circle_4; 
let x, y, r;
let avgColor;
let img;



function preload() {
  img = loadImage("capybara.jfif");
  createCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  circles = [{x:width/2, y:height/2, r:height/2}];
  imageMode(CENTER);
  fill(getAvgColor());
  drawCircle(circles[0]);
  
}

function draw() {
  //splitCircle();
}

function drawCircle(circle){
  ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
}

function splitCircle(){
  for (let i = 0; i < circles.length; i ++){
    const circle = circles[i];
    if (!circle.split && mouseInsideCircle(mouseX, mouseY, circle.x, circle.y, circle.r)){
      circle.split = true;
      let circle_1 = {
        x: circle.x - circle.r/2,
        y: circle.y - circle.r/2,
        r: circle.r/2
      };
      let circle_2 = {
        x: circle.x + circle.r/2,
        y: circle.y - circle.r/2,
        r: circle.r/2
      };
      let circle_3 = {
        x: circle.x - circle.r/2,
        y: circle.y + circle.r/2,
        r: circle.r/2
      };
      let circle_4 = {
        x: circle.x + circle.r/2,
        y: circle.y + circle.r/2,
        r: circle.r/2
      };

      circles.push(circle_1);
      circles.push(circle_2);
      circles.push(circle_3);
      circles.push(circle_4);
      
      drawCircle(circle_1);
      drawCircle(circle_2);
      drawCircle(circle_3);
      drawCircle(circle_4);
    }   
  }
}

function mouseInsideCircle(mouseX, mouseY, circleX, circleY, circleR){
  return dist(mouseX, mouseY, circleX, circleY) < circleR && circleR > 2;
}

function getAvgColor(){
  return avgColor = img.get(width/2, height/2);
  
}
