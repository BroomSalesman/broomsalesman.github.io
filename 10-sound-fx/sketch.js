// Sound Effects Demo
// October 16, 2024


function preload() {
  bgMusic = loadsound("Port Antonio.mp3");
  clickFx = loadsound("turn_page.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function mousePressed() {
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
  }
}
