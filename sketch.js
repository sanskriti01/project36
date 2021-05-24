var dog, happyDog, foodS, foodStock, dogImg, happyDogImg, database, fedTime, lastFeed, addFood, feed, foodObj;

function preload()
{
	dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png')
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  foodObj = new Food();

  dog = createSprite(250, 350,10,60)
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed The Dog");
  feed.position(200,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(300,95);
  addFood.mousePressed(addFood);

  
}


function draw() { 
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('Feed Dog');
  fedTime.on("value", function (Data){
    lastFeed = data.val();
  })
  fill (255,255,254);
  textSize(15);
  if(lastFeed>=12){
    text("Last Feed: "+lastFeed%12 + " PM",350,30);
  }else if(lastFeed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFeed + " AM",350,30 );
  }


  if(foodS!= undefined){
    textSize(20);
    fill("white");
    text("Note: Press UP ARROW to feed DRAGO milk", 50,50);
    text("Food Remaining: "+foodS,150,150);
  

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }
  
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20; 
    }



  drawSprites();
  //add styles here

}
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}
function fedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  food: foodObj.getFoodStock(),
  fedTime: hour()
  })
}
function addFood(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref("/").update({
    food:x
  });
}





