//Create variables here
var dog,happyDog,foodS,foodStock,database;
var dogImage,happyDogImage;
var fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);

  var dog = createSprite(200,200,50,50);
  dog.addImage("dog",dogImage);
  dogImage.scale = 0.1;

   var happyDog = createSprite(250,250,50,50);
   happyDog.addImage("happyDog",happyDogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed("feedDog");

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);


 fill(255,255,254);
 textSize(15)
 if(lastFed>=12){
   text("Last Fed :"+lastFed%12+"PM" ,350,30)
 }else if(lastFed=0){
   text("Last Fed :AM",350,30)
 }else {
   text("Last Fed :"=lastFed%12+"AM")
 }

 fedTime = database.ref("FeedTime")
 fedTime.on("value",function(data){
   lastFed = data.val(); 
  });


drawSprites();
 

}

function readStock(data){
foodS = data.val();


}

function writeStock(x){
if(x<=0){
x=0;
}else{
  x= x-1;

}
  database.ref('/').update({
 Food:x 
})

}

function feedDog(){
dog.addImage(happyDogImage)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function addFoods(){
foodS++;
database.ref("/").update({
  Food:foodS
})


}

