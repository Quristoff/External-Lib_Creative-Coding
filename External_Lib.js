let cav;
let capture;
let pose;
let xLoc;
let yLoc;
let aList = []

// create an idea class
class Idea{
  constructor(word){
    this.word = word;
    this.size = floor(random(10,40));
    this.angle = random(0,2*PI);
    this.counterX = 0;
    this.counterY = 0;
    this.color = color(random(255),random(255),random(255))
  }

  // show the idea
  show(xPos,yPos) {
    noStroke();
    fill(this.color);
    textAlign(RIGHT);
    textSize(this.size);
    push();
    translate(xPos-this.counterX,yPos-this.counterY);
    rotate(this.angle);
    text(this.word,0,0);
    pop();

  }
}

function setup(){
    createCanvas(700,500);

    // create capture
    capture = createCapture(VIDEO);
    capture.hide();

    // when the capture is detected, call the modelReady method
    pose = ml5.poseNet(capture, modelReady);


}

function draw() {
    background(255,255,255);
    imageMode(CENTER);


    image(capture,width/2,height/2);


    //ellipse(xLoc,yLoc-150,10,10);
    // we want the point to be at the forehead
    // i used nose.y-150 based on the estimation of my
    // own head

    if (random(0,1)> 0.6){ // there is 40% possibility of generating a new idea
      aList.push(new Idea("Ideas"));
    }

    for(var i = 0 ; i < aList.length;i++){
      aList[i].show(xLoc,yLoc-100);
      aList[i].counterY += 1; // move the idea upward in their rotated direction
      aList[i].counterX += 1/tan(aList[i].angle);
    }

    if (mouseIsPressed){
      textAlign(CENTER);
      text("New Idea",mouseX,mouseY);
    }



}

function modelReady(){
  console.log('ready');
  pose.on('pose', gotPose)
  // .on("pose",callback) is an instance method where the call-back
  // is called when the pose is detected
}

function gotPose(results){
  // result is returning a list of objects of
  // different parts of human body
  // and their location
  if (!results[0]) return; // if no pose is detected
  //console.log(results[0].pose);
  xLoc = results[0].pose.nose.x;
  yLoc = results[0].pose.nose.y;
}
