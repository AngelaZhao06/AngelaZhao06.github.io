// Capybaras To The Max 
// Angela Zhao
// 13/10/2022
//
// Extra for Experts:
//Vine Boom sound effect everytime you press r

let circles;
let circle_1, circle_2, circle_3, circle_4; 
let x, y, r;
let avgColor;
let img;
let vineBoom;



function preload() {
  img = loadImage("capybara.jfif");
  vineBoom = loadSound("vineBoom.m4a");
  createCanvas(windowWidth, windowHeight);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  circles = [{x:width/2, y:height/2, r:height/2.5}];
  fill(getAvgColor(width, height));
  drawCircle(circles[0]);
  
}

function draw() {
  splitCircle();
}

function drawCircle(circle){
  ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
}

function splitCircle(){ 
  for (let i = 0; i < circles.length; i ++){
    circle = circles[i];
    if (!circle.split && mouseInsideCircle(mouseX, mouseY, circle.x, circle.y, circle.r)){ 
      //if circle radius is bigger than 6 and mouse is inside circle then split circle 
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
      
      fill(getAvgColor(circle_1.x, circle_1.y));
      drawCircle(circle_1);
      fill(getAvgColor(circle_2.x, circle_2.y));
      drawCircle(circle_2);
      fill(getAvgColor(circle_3.x, circle_3.y));
      drawCircle(circle_3);
      fill(getAvgColor(circle_4.x, circle_4.y));
      drawCircle(circle_4);
    }   
  }
}

function mouseInsideCircle(mouseX, mouseY, circleX, circleY, circleR){
  return dist(mouseX, mouseY, circleX, circleY) < circleR && circleR > 6;
}

function getAvgColor(x, y){
  return avgColor = img.get(x/2.5, y/1.5);
}

function keyPressed() {
  if (key === "r") {
    background(255);
    vineBoom.play();
    fill(getAvgColor(width, height));
    drawCircle(circles[0]);
    circles = [{x:width/2, y:height/2, r:height/2.5}];
  }
}