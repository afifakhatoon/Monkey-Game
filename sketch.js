
var monkey , monkey_running, monkeyCollide;
var monkey_walk;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var survivalTime=0;   
var gameState = PLAY;
var bgImage
var stoneImage
function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
bananaImg=loadImage("banana.png");
  bgImage=loadImage("jungle.jpg");
  stoneImage=loadImage("obstacle.png");
  monkey_walk=loadAnimation("monkey_0.png");
}

function setup(){
 createCanvas(600,600);
 ground = createSprite(300,300,600,600);
 ground.addImage(bgImage);
  ground.velocityX=-4;
ground.x = ground.width /2;
player = createSprite(100,540,20,50);
player.addAnimation("monkey",monkey_running);
player.addAnimation("monkey2",monkey_walk);
player.scale = 0.3;
   bananaGroup=new Group();
   stoneGroup=new Group();
 
  invisiGround=createSprite(300,580,600,20);
  invisiGround.visible=false;
}

function draw(){
  background(255);
  player.collide(invisiGround);
  stroke("black");
  textSize(20);
  if (gameState===PLAY){
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time :"+ survivalTime,100,50);
      if(keyDown("space")){
        player.velocityY=-8;
      } 
     
      player.velocityY = player.velocityY + 0.8;
    if (ground.x <0){
        ground.x = ground.width/2;
  }
  food();
  stone();
  
    }
  drawSprites();
  
  
  if(stoneGroup.isTouching(player)){
    gameState=END;
    player.changeAnimation("monkey2");
    player.velocityX=0;
    ground.velocityX=0;
    survivalTime=0;
    bananaGroup.destroyEach()
    stoneGroup.destroyEach()
  }
  
}
   function food(){
   if(World.frameCount%80===0){
     var banana = createSprite(600,320);
     banana.addImage("Banana.png",bananaImg);
     banana.scale=0.3;
  rand=Math.round(random(4,7));
  banana.y=random(119,215);
  banana.velocityX=-5;
  banana.setLifetime=100;
  bananaGroup.add(banana);
   }
}
  function stone(){
    if(World.frameCount%80===0){
      var stone = createSprite(600,550);
      stone.addImage("obstacle",stoneImage);
      stone.scale=0.2;
   rand=Math.round(random(4,7));
   stone.velocityX=-5;
   stone.setLifetime=100;
   stoneGroup.add(stone);
    }
  }