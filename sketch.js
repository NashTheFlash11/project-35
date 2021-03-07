//Create variables here

var dog, happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();

  createCanvas(500, 500);
  dog = createSprite(30, 30, 250, 250);

  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  
  
  drawSprites();
  //add styles here

  fill("white");
  stroke(10);
  text("NOTE: Press UP_ARROW To Feed Drago Milk!");
  textSize(10);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}



