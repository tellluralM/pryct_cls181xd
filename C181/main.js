var img;
var smallPoints, largePoints;
var maxPts = 53500;
var numPts = 0;

function preload() {
  img = loadImage("imagenxd.jpg")
}

function setup() {
  var dim = 600;
  
  if(img.height < img. width) {
    img.resize(dim, 0);
  } else {
    img.resize(0, dim);
  }
  
  createCanvas(img.width, img.height);
  
  
  smallPoint = width / 500;
  largePoint = width / 20;
  
  imageMode(CENTER);
  
  img.resize(width, height);
}

function draw() {
  if(numPts < maxPts) {
    
    var pointillize = lerp(largePoint, smallPoint, numPts / maxPts);
    
    for(var i = 0; i < 200 && numPts < maxPts; i++) {
      

      var x = floor(random(img.width));
      var y = floor(random(img.height));


      let pix = img.get(x, y);
      var d = 10;


      var newCol = getHSBVariation(
        pix,
        random(-0.2, 0.2) * d, random(-0.1, 0.1) * d, random(-0.1, 0.1) * d
      )
      

      newCol.setAlpha(random(0, 250));

      fill(newCol);

      noFill();
      stroke(newCol);
      strokeWeight(random() * 3 + 2);
      
      push();
      translate(x, y);
      rotate(random(PI));

      line(0, 0, pointillize * 0.7 * (1), pointillize * 0.7 * (1));
      pop();
      numPts++;
    }
  }
}

function getRGBVariation(col, randR, randG, randB) {
  colorMode(RGB);
  let tempCol =
    color(
      red(col) + randR,
      green(col) + randG,
      blue(col) + randB
    );

  return tempCol;
}

function getHSBVariation(col, randH, randS, randB) {
  var H = hue(col),
    S = saturation(col),
    B = brightness(col);
  colorMode(HSB);
  var tempCol =
    color(
      H + randH,
      constrain(S + randS, 0, 100),
      constrain(B + randB, 0, 100)
    );
  colorMode(RGB);
  return tempCol;
}