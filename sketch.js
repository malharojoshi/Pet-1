//Create variables here

var dog, dogImg, happyDogImg, database;
var foodStock = 0;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  //load images here
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(200, 300, 1, 1);
  dog.addImage(dogImg);
  dog.scale = 0.1;
  food = database.ref("pet/food");
  food.on("value", readStock);
}
function readStock(data) {
  foodStock = data.val();
}
function draw() {
  background(46, 139, 870);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodStock);
    //foodStock = foodStock - 1;
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  text("Food: " + foodStock, 100, 250);
}

function writeStock(x) {
  if (x > 0) {
    x = x - 1;
  } else {
    x = 0;
  }
  database.ref("pet/").update({ food: x });
}
