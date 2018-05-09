//(width - (width/12 * 2)) / 7 * i 
var gray1 = 150;
var bgGray = 250;
var chBoxColor;
var patternCol;

var dots = [];
var questions = [];
var toggle;

var leftMargin, rightMargin;
var containerWidth;
var ansWidth;
var ansHeight;
var gutterAns;

var ch1XY;
var ch2XY;
var ch3XY;
var ch4XY;
var ch1BoxW;
var ch2BoxW;
var ch3BoxW;
var ch4BoxW;
var ch1BoxWT;
var ch2BoxWT;
var ch3BoxWt;
var ch4BoxWT;

//the next variable 'currentQuestion' also globally tells the state of the whole program. 
//it's value 0-6 are questions but 7 is displaying the spider pattern
var currentQuestion;
var textMargin;

//Variables for drawing the Spider Pattern
var numInputs;
var angle;
var rValues = [];
var xInputs = [];
var yInputs = [];
var dx = [0, 0, 0, 0, 0, 0, 0];
var dy = [0, 0, 0, 0, 0, 0, 0];
var lerpFactor2 = 0.03;
var lerpFactor1 = 0.01;
var secondarySetupDone = false;
var scaleLimit;

var fontAvenir;
var endText = ["",
  "This is your Digital Footprint\n\nGoogle, Facebook or Twitter are not free of charge, but are paid for with our data. How do you feel about that?",
  "Every day, whether we want to or not, most of us contribute to a growing portrait of who we are online; a portrait that is probably more public than we assume.\n \nLet’s see how this portrait aka your digital footprint looks like…"
];
var index;

function preload() {
  fontAvenir = loadFont('assets/AvenirLTStd-Roman.otf');
}


function setup() {
  // createCanvas(2048 / 3, 1536 / 3);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  patternCol = color("#00cdcd");
  chBoxColor = color("#743ae7");
  textFont(fontAvenir);

  leftMargin = width / 12;
  rightMargin = width / 12;
  containerWidth = (width - (width / 12 * 2));


  gutterAns = containerWidth / 20;
  ansWidth = (containerWidth - gutterAns) / 2;
  ansHeight = height / 8;
  textMargin = gutterAns / 4;
  toggle = false;
  currentQuestion = -1;
  index = floor(random(endText.length));

  ch1XY = createVector(leftMargin, height / 2);
  ch2XY = createVector(leftMargin + ansWidth + gutterAns, ch1XY.y);
  ch3XY = createVector(leftMargin, ch1XY.y + ansHeight + gutterAns);
  ch4XY = createVector(leftMargin + ansWidth + gutterAns, ch1XY.y + ansHeight + gutterAns);

  ch1BoxW = 2;
  ch2BoxW = 2;
  ch3BoxW = 2;
  ch4BoxW = 2;
  ch1BoxWT = 2;
  ch2BoxWT = 2;
  ch3BoxWT = 2;
  ch4BoxWT = 2;


  //initialising the location of dots indicator
  for (var i = 0; i < 7; i++) {
    dots[i] = new Dot(containerWidth / 10 * i + 2 * leftMargin + (containerWidth / 10), height / 12, 12, 150);
  }

  numInputs = 7;
  angle = 360 / numInputs;
  scaleLimit = 200;


  questions[0] = new Qs("Q1. Which Social Media platform do you actively use?",
    "Facebook",
    "Instagram",
    "Snapchat",
    "Twitter");

  questions[1] = new Qs("Q2. How much time do spend on Social Media per day?",
    "<30 mins",
    "30 mins - 1hr",
    "1hr - 2hrs",
    ">2hrs");

  questions[2] = new Qs("Q3. Do you know how cookies impact your web experience? \n(Select all that apply)",
    "where visitor came from? e.g search engine, search keyword, lin",
    "each user’s amount of visits, and time of the first visit, previous visit and the current visit",
    "checks approximately how long you stay on site: when a visit starts, and approximately ends",
    "track visitor movement");

  questions[3] = new Qs("Q4. When I’m on facebook or similar platforms, the ad that I see are:",
    "relevant to me",
    "irrelevant to me",
    "sometimes relevant, sometimes not",
    "I don’t see ads");

  questions[4] = new Qs("Q5. How often do you tweet, post (contribute) on social media platforms?",
    "Daily",
    "2-3 times a week",
    "2-3 times a month",
    "Rarely or Never");

  questions[5] = new Qs("Q6. Do you use any of the following services?",
    "Ad Blockers",
    "Virtual Private Networks (VPNs)",
    "Search Engines that do no track you",
    "None of the above");

  questions[6] = new Qs("Q7. Do you do any of the following while accessing websites?",
    "Select “Remember my password\"",
    "Save Card Details",
    "Wishlists",
    "All of the above");

} //END OF SETUP

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  background(bgGray);

  if (currentQuestion > 6) {
    // background(bgGray);

    if (!secondarySetupDone) {
      secondarySetup();
    }

    push();
    translate(3 * width / 4, height / 2);

    dx[0] = lerp(dx[0], xInputs[0], lerpFactor1);
    dy[0] = lerp(dy[0], yInputs[0], lerpFactor1);
    dx[1] = lerp(dx[1], xInputs[1], lerpFactor2);
    dy[1] = lerp(dy[1], yInputs[1], lerpFactor2);
    dx[2] = lerp(dx[2], xInputs[2], lerpFactor2);
    dy[2] = lerp(dy[2], yInputs[2], lerpFactor2);
    dx[3] = lerp(dx[3], xInputs[3], lerpFactor1);
    dy[3] = lerp(dy[3], yInputs[3], lerpFactor1);
    dx[4] = lerp(dx[4], xInputs[4], lerpFactor1);
    dy[4] = lerp(dy[4], yInputs[4], lerpFactor1);
    dx[5] = lerp(dx[5], xInputs[5], lerpFactor2);
    dy[5] = lerp(dy[5], yInputs[5], lerpFactor2);
    dx[6] = lerp(dx[6], xInputs[6], lerpFactor1);
    dy[6] = lerp(dy[6], yInputs[6], lerpFactor1);

    //To display the dynamic shape we're building from input values
    beginShape();
    noStroke();
    fill(patternCol, 100);
    for (var j = 0; j < 7; j++) {
      vertex(dx[j], dy[j]);
    }
    endShape(CLOSE);

    //Display Lines by Rotating each one of them in a loop

    for (var i = 0; i < numInputs; i++) {
      stroke(bgGray);
      // strokeWeight(2);
      line(0, 0, 0, -scaleLimit);
      rotate(angle);
    }
    
    //To display Concentric Circles
 	 for (var j = 0; j < 5; j++) {
  	  noFill();
    	stroke(bgGray - 50, 50);
    	// strokeWeight(2);
    	ellipse(0, 0, j * 100);
  	}

    pop();

    push();
    fill(0);
    rectMode(CENTER);
    textSize(20);
    textAlign(CENTER);
    // print(index);
    text(endText[0], 9 * width / 12, 9.5 * height / 12, 250, 50);
    pop();
    
    push();
    fill(0);
    textSize(20);
    // print(index);
    text(endText[1], width / 12, 5 * height / 12, 350, 150);
    pop();

    noStroke();
    // displayBackBt();
    displayNextBt();


  } else if (currentQuestion == -1){
    // background
    push();
    fill(0);
    rectMode(CENTER);
    textSize(20);
    textAlign(CENTER);
    text(endText[2], width/2, height/2, 3*width/4, 300);
    pop();
    noStroke();
    displayNextBt();
  } else {
    secondarySetupDone = false;
    stroke(gray1);
    strokeWeight(2);
    line(leftMargin, 2 * height / 12, width - rightMargin, 2 * height / 12);

    noStroke();
    fill(gray1);

    for (var i = 0; i < 7; i++) {
      // ellipse(containerWidth / 7 * i + leftMargin + (containerWidth / 14), height / 12, 10, 10);
      for (var j = 0; j <= currentQuestion; j++) {
        dots[j].col = chBoxColor;
        dots[j].size = 15;
      }

      for (var j = currentQuestion + 1; j < 7; j++) {
        dots[j].col = 200;
        dots[j].size = 15;
      }

      dots[currentQuestion].size = 25;
      dots[i].disp();
    }


    // to test changing the color of dot indicator
    // if (toggle) {
    //   dots[0].col = 0;
    // } else {
    //   dots[0].col = 150;
    // }

    // ellipse(width/2, height / 12 + 15, 12, 12); //test centered dot

    ch1BoxW = lerp(ch1BoxW, ch1BoxWT, 0.2);
    ch2BoxW = lerp(ch2BoxW, ch2BoxWT, 0.2);
    ch3BoxW = lerp(ch3BoxW, ch3BoxWT, 0.2);
    ch4BoxW = lerp(ch4BoxW, ch4BoxWT, 0.2);


    //Choices Frames
    fill(bgGray - 10);
    // stroke(180);
    // strokeWeight(3);
    rect(ch1XY.x, ch1XY.y, ansWidth, ansHeight);
    rect(ch2XY.x, ch2XY.y, ansWidth, ansHeight);
    rect(ch3XY.x, ch3XY.y, ansWidth, ansHeight);
    rect(ch4XY.x, ch4XY.y, ansWidth, ansHeight);

    //Questions and Choices
    displayQuestion(currentQuestion);
    displayChoice1(currentQuestion);
    displayChoice2(currentQuestion);
    displayChoice3(currentQuestion);
    displayChoice4(currentQuestion);


    displayNextBt();
    displayBackBt();

    // Testing
    // questions[2].calcValue();
    // print(questions[2].totalValue);

  }

  text(windowWidth, 10, 10, 50, 50);
  text(windowHeight, 40, 10, 50, 50);

} //END OF DRAW

function mouseReleased() {
  // toggle = !toggle;

  if (mouseX > ch1XY.x && mouseX < ch1XY.x + ansWidth && mouseY > ch1XY.y && mouseY < ch1XY.y + ansHeight) {
    questions[currentQuestion].ch1 = !questions[currentQuestion].ch1;
    specQuesCond(currentQuestion, 1);
  }

  if (mouseX > ch2XY.x && mouseX < ch2XY.x + ansWidth && mouseY > ch2XY.y && mouseY < ch2XY.y + ansHeight) {
    questions[currentQuestion].ch2 = !questions[currentQuestion].ch2;
    specQuesCond(currentQuestion, 2);
  }

  if (mouseX > ch3XY.x && mouseX < ch3XY.x + ansWidth && mouseY > ch3XY.y && mouseY < ch3XY.y + ansHeight) {
    questions[currentQuestion].ch3 = !questions[currentQuestion].ch3;
    specQuesCond(currentQuestion, 3);
  }

  if (mouseX > ch4XY.x && mouseX < ch4XY.x + ansWidth && mouseY > ch4XY.y && mouseY < ch4XY.y + ansHeight) {
    questions[currentQuestion].ch4 = !questions[currentQuestion].ch4;
    specQuesCond(currentQuestion, 4);
  }


  if (mouseX > ch4XY.x + 3 * ansWidth / 4 && mouseX < width - rightMargin && mouseY > ch4XY.y + ansHeight + gutterAns && mouseY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
    currentQuestion++;

  if (mouseX > leftMargin && mouseX < leftMargin + ansWidth / 4 && mouseY > ch4XY.y + ansHeight + gutterAns && mouseY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
    currentQuestion--;

  if (currentQuestion < -1)
    currentQuestion = -1;

  // if (currentQuestion == 7 && mouseX > leftMargin && mouseX < leftMargin + ansWidth / 4 && mouseY > ch4XY.y + ansHeight + gutterAns && mouseY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
  //   window.print();

  if (currentQuestion > 7)
    window.location.reload();
    // currentQuestion = 0;



  // return false;

} //END OF MOUSE RELEASED

function touchEnded() {
  // toggle = !toggle;

  if (touchX > ch1XY.x && touchX < ch1XY.x + ansWidth && touchY > ch1XY.y && touchY < ch1XY.y + ansHeight) {
    questions[currentQuestion].ch1 = !questions[currentQuestion].ch1;
    specQuesCond(currentQuestion, 1);
  }

  if (touchX > ch2XY.x && touchX < ch2XY.x + ansWidth && touchY > ch2XY.y && touchY < ch2XY.y + ansHeight) {
    questions[currentQuestion].ch2 = !questions[currentQuestion].ch2;
    specQuesCond(currentQuestion, 2);
  }

  if (touchX > ch3XY.x && touchX < ch3XY.x + ansWidth && touchY > ch3XY.y && touchY < ch3XY.y + ansHeight) {
    questions[currentQuestion].ch3 = !questions[currentQuestion].ch3;
    specQuesCond(currentQuestion, 3);
  }

  if (touchX > ch4XY.x && touchX < ch4XY.x + ansWidth && touchY > ch4XY.y && touchY < ch4XY.y + ansHeight) {
    questions[currentQuestion].ch4 = !questions[currentQuestion].ch4;
    specQuesCond(currentQuestion, 4);
  }


  if (touchX > ch4XY.x + 3 * ansWidth / 4 && touchX < width - rightMargin && touchY > ch4XY.y + ansHeight + gutterAns && touchY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
    currentQuestion++;

  if (touchX > leftMargin && touchX < leftMargin + ansWidth / 4 && touchY > ch4XY.y + ansHeight + gutterAns && touchY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
    currentQuestion--;

  if (currentQuestion < -1)
    currentQuestion = -1;

  // if (currentQuestion == 7 && mouseX > leftMargin && mouseX < leftMargin + ansWidth / 4 && mouseY > ch4XY.y + ansHeight + gutterAns && mouseY < ch4XY.y + ansHeight + gutterAns + ansHeight / 2)
  //   window.print();

  if (currentQuestion > 7)
    window.location.reload();
    // currentQuestion = 0;



  return false;

} //END OF TOUCH RELEASED

function displayQuestion(questNo) {
  //Questions
  push();
  fill(100);
  if (windowWidth > 850)
    textSize(22);
  else
    textSize(18);
  text(questions[questNo].q, leftMargin + textMargin, 3.5 * height / 12 + textMargin, containerWidth - textMargin, 50);
  // fill(180, 50);
  // rect(leftMargin, 3.5 * height / 12, containerWidth, containerWidth / 8);
  pop(0);
}

function displayChoice1(questNo) {
  push();
  fill(chBoxColor);
  noStroke();
  rect(ch1XY.x, ch1XY.y, ch1BoxW, ansHeight);
  pop();

  push();
  textSize(14);
  if (questions[currentQuestion].ch1) {
    fill(255);
    ch1BoxWT = ansWidth;
  } else {
    fill(100);
    ch1BoxWT = 2;
  }

  if (windowWidth > 850)
    textSize(18);
  else
    textSize(16);

  text(questions[questNo].ch1Text, ch1XY.x + textMargin, ch1XY.y + textMargin, ansWidth - textMargin, ansHeight - textMargin);
  pop();
}

function displayChoice2(questNo) {
  push();
  fill(chBoxColor);
  noStroke();
  rect(ch2XY.x, ch2XY.y, ch2BoxW, ansHeight);
  pop();

  push();
  textSize(14);
  if (questions[currentQuestion].ch2) {
    fill(255);
    ch2BoxWT = ansWidth;
  } else {
    fill(100);
    ch2BoxWT = 2;
  }

  if (windowWidth > 850)
    textSize(18);
  else
    textSize(16);

  text(questions[questNo].ch2Text, ch2XY.x + textMargin, ch2XY.y + textMargin, ansWidth - textMargin, ansHeight - textMargin);
  pop();
}

function displayChoice3(questNo) {
  push();
  fill(chBoxColor);
  noStroke();
  rect(ch3XY.x, ch3XY.y, ch3BoxW, ansHeight);
  pop();

  push();
  textSize(14);
  if (questions[currentQuestion].ch3) {
    fill(255);
    ch3BoxWT = ansWidth;
  } else {
    fill(100);
    ch3BoxWT = 2;
  }

  if (windowWidth > 850)
    textSize(18);
  else
    textSize(16);

  text(questions[questNo].ch3Text, ch3XY.x + textMargin, ch3XY.y + textMargin, ansWidth - textMargin, ansHeight - textMargin);
  pop();
}

function displayChoice4(questNo) {
  push();
  fill(chBoxColor);
  noStroke();
  rect(ch4XY.x, ch4XY.y, ch4BoxW, ansHeight);
  pop();

  push();
  textSize(14);
  if (questions[currentQuestion].ch4) {
    fill(255);
    ch4BoxWT = ansWidth;
  } else {
    fill(100);
    ch4BoxWT = 2;
  }

  if (windowWidth > 850)
    textSize(18);
  else
    textSize(16);

  text(questions[questNo].ch4Text, ch4XY.x + textMargin, ch4XY.y + textMargin, ansWidth - textMargin, ansHeight - textMargin);
  pop();
}

function displayNextBt() {
  fill(bgGray - 10);
  rect(ch4XY.x + 3 * ansWidth / 4, ch4XY.y + ansHeight + gutterAns, ansWidth / 4, ansHeight / 2);
  fill(100);
  push()
  textAlign(CENTER, CENTER);
  if (currentQuestion == 7)
    text("RESET", ch4XY.x + 3 * ansWidth / 4, ch4XY.y + ansHeight + gutterAns, ansWidth / 4, ansHeight / 2);
  else
    text("NEXT", ch4XY.x + 3 * ansWidth / 4, ch4XY.y + ansHeight + gutterAns, ansWidth / 4, ansHeight / 2);
  pop();
}

function displayBackBt() {
  fill(bgGray - 10);
  rect(leftMargin, ch4XY.y + ansHeight + gutterAns, ansWidth / 4, ansHeight / 2);
  fill(100);
  push();
  noStroke();
  textAlign(CENTER, CENTER);
  text("BACK", leftMargin, ch4XY.y + ansHeight + gutterAns, ansWidth / 4, ansHeight / 2);
  pop();
}

//Secondary Setup required for generating the Spider Pattern
function secondarySetup() {

  for (var i = 0; i < numInputs; i++) {
    questions[i].calcValue();
    rValues[i] = questions[i].totalValue;
  }

  polarToCartesian();
  secondarySetupDone = true;
}

function polarToCartesian() {
  for (var i = 0; i < numInputs; i++) {
    yInputs[i] = -(map(rValues[i], 0, 100, 0, scaleLimit)) * cos(i * angle);
    xInputs[i] = (map(rValues[i], 0, 100, 0, scaleLimit)) * sin(i * angle);
    // print(xInputs[i] + " | " + yInputs[i] + " | " + (i * angle));
  }
}

//Specific Question Conditions
function specQuesCond(currentQuestion, chNum) {
  if (currentQuestion == 1 || currentQuestion == 3 || currentQuestion == 4) {
    switch (chNum) {
      case 1:
        questions[currentQuestion].ch2 = false;
        questions[currentQuestion].ch3 = false;
        questions[currentQuestion].ch4 = false;
        break;

      case 2:
        questions[currentQuestion].ch1 = false;
        questions[currentQuestion].ch3 = false;
        questions[currentQuestion].ch4 = false;
        break;

      case 3:
        questions[currentQuestion].ch2 = false;
        questions[currentQuestion].ch1 = false;
        questions[currentQuestion].ch4 = false;
        break;

      case 4:
        questions[currentQuestion].ch2 = false;
        questions[currentQuestion].ch3 = false;
        questions[currentQuestion].ch1 = false;
        break;

      default:
        questions[currentQuestion].ch1 = false;
        questions[currentQuestion].ch2 = false;
        questions[currentQuestion].ch3 = false;
        questions[currentQuestion].ch4 = false;
        break;
    }
  }

  if (currentQuestion == 5 || currentQuestion == 6) {
    switch (chNum) {
        
      case 1:
        questions[currentQuestion].ch4 = false;
        break;
        
      case 2:
        questions[currentQuestion].ch4 = false;
        break;
        
      case 3:
        questions[currentQuestion].ch4 = false;
        break;
        
      case 4:
        questions[currentQuestion].ch1 = false;
        questions[currentQuestion].ch2 = false;
        questions[currentQuestion].ch3 = false;
        break;

      default:
        //
        break;
    }
  }
}

function resetSketch() {
  
}

class Dot {
  constructor(x, y, s, col) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.col = col
    this.active = false;
  }

  disp() {
    push();
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}

class Qs {
  constructor(Q, ch1, ch2, ch3, ch4) {
    this.q = Q;
    this.ch1Text = ch1;
    this.ch2Text = ch2;
    this.ch3Text = ch3;
    this.ch4Text = ch4;
    this.ch1 = false;
    this.ch2 = false;
    this.ch3 = false;
    this.ch4 = false;
    this.ch1Value = 0;
    this.ch2Value = 0;
    this.ch3Value = 0;
    this.ch4Value = 0;
    this.totalValue = 0;
  }

  calcValue() {
    if (this.ch1) {
      switch(currentQuestion){
        case 1:
        	this.ch1Value = 25;
        	break;
          
        case 3:
          this.ch1Value = 100;
          
        case 4:
          this.ch1Value = 100;
        
        default:
      		this.ch1Value = 25;
        	break;
      }
    } else {
      this.ch1Value = 0;
    }

    if (this.ch2) {
      switch(currentQuestion){
        case 1:
        	this.ch2Value = 50;
        	break;
          
        case 3:
          this.ch2Value = 75;
          break;
          
        case 4:
          this.ch2Value = 75;
          break;
        
        default:
      		this.ch2Value = 25;
        	break;
      }
    } else {
      this.ch2Value = 0;
    }

    if (this.ch3) {
      switch(currentQuestion){
        case 1:
        this.ch3Value = 75;
        break;
          
        case 3:
          this.ch3Value = 50;
          break;
          
        case 4:
          this.ch3Value = 50;
          break;
        
        default:
      	this.ch3Value = 25;
        break;
      }
    } else {
      this.ch3Value = 0;
    }

    if (this.ch4) {
      switch(currentQuestion){
        case 1:
        this.ch4Value = 100;
        break;
          
        case 3:
          this.ch4Value = 25;
          break;
          
        case 4:
          this.ch4Value = 25;
          break;
          
        case 5:
          this.ch4Value = 100;
          break;
          
        case 6:
          this.ch4Value = 100;
          break;
        
        default:
      	this.ch4Value = 25;
        break;
      }
    } else {
      this.ch4Value = 0;
    }

    this.totalValue = this.ch1Value + this.ch2Value + this.ch3Value + this.ch4Value;
  }


}