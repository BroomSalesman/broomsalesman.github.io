// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//after certain scores more options get added
let diffLevels = [easy];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill(255, 255, 0);
  square(50, 50, 50)

  fill (0, 255, 255);
  square(100, 50, 50)



  fill(127.5, 255, 127.5);
  square(150, 50, 50)
}



function changeDifficulty() {

}



function spawnEasyObstacle() {
  obstacle = {
    difficulty: diffLevels[random(diffLevels.length)],
  }
}


