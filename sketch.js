//Create variables here

var dog, happyDog;
var database;
var foodS;
var foodStock;
var dogImage, happyDogImage;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
	database = firebase.database();

  createCanvas(500, 500);
  dog = createSprite(300, 300, 50, 50);

  dog.addImage(dogImage);
  dog.scale = 0.25;

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
  textSize(10);
  text("NOTE: Press UP_ARROW To Feed Drago Milk!", 200, 20);

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



