// Main Reference
// https://editor.p5js.org/zahrak/sketches/SyGFspkjz
// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>
// The Nature of Code

let habitat;
let ferns = [];
let ambientSounds = [];
let soundEffects = [40, 40, 30, 50, 50, 20, 30, 30, -20, -40, -50, -50, -50, -30, -25, -25]
let soundIndex =0;
let soundInterval = 100;

function preload(){
    bckgrnd = loadImage('background.jpg');
}

function setup() {
  createCanvas(1366, 768);
  frameRate(5);
  //background(255,255,224);
  
  streamsound = createAudio('loop.mp3')
  
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 7;
  drawingContext.shadowColor = color(29,20,21);

  ferns[0] = loadImage('fern1.png')
  ferns[1] = loadImage('fern2.png')
  ferns[2] = loadImage('fern3.png')
  
  for (let i = 0; i < 16; i++) {
     ambientSounds[i] = createAudio('sample'+(i+1)+'.mp3')
  }
  
  habitat = new Habitat(50);
}

function draw() {
  //background(255,255,224);
  image(bckgrnd,0,0,1366,768);
  habitat.evolve();
  habitat.display();
  
  soundInterval -= 1;
  if(soundInterval == 0) {
      soundIndex = parseInt(random(ambientSounds.length)) ;
      ambientSounds[soundIndex].play();
      habitat.disturb(soundEffects[soundIndex]);
      console.log(soundIndex);
      soundInterval = parseInt(random(50, 100));
      //console.log(soundInterval);
  }
  //text(parseInt(habitat.environ), 10, 30);  
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    habitat.disturb(-50);
    //console.log('up');
    //console.log(habitat.environ);
    
  }
  if (keyCode == DOWN_ARROW) {
    habitat.disturb(50);
    //console.log('down');
    //console.log(habitat.environ);
  }
  if (keyCode == LEFT_ARROW) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  if (keyCode == RIGHT_ARROW) {
  }
}

function mousePressed(){
    getAudioContext().resume() 
    streamsound.play()
    streamsound.loop(true)
    //streamsound.volume(0.8)
}
