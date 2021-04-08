var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score=0;
var PLAY = 1;
var END =0;
var survivalTime=0;
var invGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.15;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invGround=createSprite(400,355,1500,10);
  invGround.velocityX=-4;
  invGround.x=invGround.width/2;
  invGround.visible=false;
  
  monkey.setCollider("circle",2,2);
  monkey.debug=false;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("skyblue");
    
    if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(invGround.x<0){
    invGround.x=invGround.width/2;
  }

   if (keyDown("space")&& monkey.y>=300){            
     monkey.velocityY=-15;
   }
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide(invGround);
  
    if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
   
  
  if (obstacleGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX=0;
  }
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time : "+ survivalTime,100,50);
  
  Fruits();
  obstacle();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score , 300 , 50);
  }

function Fruits(){
  if(frameCount % 80 === 0){
  var banana = createSprite(400,290,20,20);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-8;
    banana.lifetime=100;
    FoodGroup.add(banana);
  }
}

function obstacle(){ 
  if (frameCount % 300 === 0){
    var obstacle = createSprite(400,317,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-8;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
   }
}


