//Create variables here 
var player, playerRunning; 
var boulder, boulderIMG; 
var spike, spikeIMG; 
var ground, groundIMG; 
var background, backgroundIMG;  
var invisibleGround; 
var gameState = 1; 
var score = 0;
var bumps, bumpIMG;
var coin, coinIMG;  
var playerVX;
var gameOver, reset;

function preload()
{
  playerRunning = loadAnimation("images/boy1.gif","images/boy2.gif","images/boy3.gif","images/boy4.gif","images/boy5.gif","images/boy6.gif","images/boy7.gif","images/boy8.gif","images/boy9.gif","images/boy10.gif","images/boy11.gif"); 
  boulderIMG = loadImage("images/boulder.png"); 
  backgroundIMG = loadImage("images/bg.jpg"); 
  groundIMG = loadImage("images/ground.png"); 
  spikeIMG = loadImage("images/spike2.png"); 
  playerStill = loadImage("images/boy2.gif");  
  bumpIMG = loadImage("images/bumps.png");
  coinIMG = loadImage("images/coin4.png"); 
  gameOverIMG = loadImage("images/gameOver.png"); 
  resetIMG = loadImage("images/restart.png");
}

function setup() {
    
  bg = createSprite(600,300,10,10); 
  bg.addImage(backgroundIMG);  
  bg.scale = 2.9;
 
  createCanvas(1200, 700);
  player = createSprite(500,580);  
  player.debug = true; 
  player.setCollider("circle", 0,0,200); 
  player.addAnimation("running",playerRunning); 
  player.scale = 0.2;    
  

  ground = createSprite(400,680,800,20); 
  ground.addImage(groundIMG);   
  ground.debug = true;
  ground.setCollider("rectangle",0,0,800,200);
  ground.scale = 0.3;   
  
  ground.x = 700; 

  invisibleGround = createSprite(400,590,800,20);  
  invisibleGround.visible = false;  
  
  invisibleGround.x =500;

  boulder = createSprite(100,550); 
  boulder.addImage(boulderIMG);   
  boulder.debug = true;
  boulder.scale = 0.2; 
   

  gameOver = createSprite(600,300);
  gameOver.addImage(gameOverIMG);  
  gameOver.visible = false;

  reset = createSprite(600,350); 
  reset.addImage(resetIMG); 
  reset.visible = false;

  spikeGroup = createGroup();  
  bumpGroup = createGroup();
  coinGroup = createGroup();
  
}


function draw() {  
  background(0);   
  camera.position.x = player.x;  
  camera.position.y = 350;
  bg.x = camera.position.x; 
  gameOver.x = camera.position.x;
  reset.x = camera.position.x; 
  
   
  

  if(gameState ===1){
  player.velocityX = 0.5; 
  boulder.velocityX = 0.5; 
  ground.velocityX = -5; 
  invisibleGround.velocityX = -3; 
  if(ground.x<0){ 
    //ground.x = ground.width/2;
    ground.x = 700;
  }  
  //console.log(invisibleGround.x); 

  
  /*if(invisibleGround.x<200){
    invisibleGround.x = 600;
  }*/   
    

  invisibleGround.x = player.x; 

  if(keyDown("space")&&player.y>=538){ 
    player.velocityY = -15; 
    
  } 
  

  player.velocityY = player.velocityY + 0.8;
  spawnObs();  
  spawnBumps(); 
  spawnCoins();

if(player.isTouching(spikeGroup) || player.isTouching(boulder)) { 
  gameState = 0; 
}    

if(player.isTouching(coinGroup)){
  coinGroup.destroyEach(); 
  score = score+10;
  
}

if(player.isTouching(bumpGroup)){
  player.velocityX = player.velocityX - .1;  
  bumpGroup.destroyEach(); 
  
}  

if(score === 50){
  player.velocityX = player.velocityX + .25;  
  player.x = 500; 
  boulder.x = 100;
}

if(boulder.isTouching(spikeGroup)){ 
  spikeGroup.destroyEach();
}

} else if(gameState === 0){ 
  ground.velocityX = 0; 
  spikeGroup.setVelocityXEach(0); 
  spikeGroup.setLifetimeEach(-1);  
  coinGroup.setVelocityXEach(0);
  //bg.velocityX = 0;  
  player.velocityY= 0;    
  player.velocityX = 0;
  boulder.velocityX = 0;  
  bumpGroup.setVelocityXEach(0);
  player.addImage(playerStill);
  gameOver.visible = true;
  reset.visible = true; 
  

} 
if (mousePressedOver(reset)){
  gameState = 1;  
  gameOver.visible = false;
  reset.visible = false;  
  spikeGroup.destroyEach();
  bumpGroup.destroyEach();  
  coinGroup.destroyEach();
  score = 0;
  

}

  player.collide(invisibleGround);  
  boulder.collide(ground);
  drawSprites(); 
  fill("white"); 
  textSize(25);
  text("score : " + score, player.x +300,100); 
  stroke(10);
  //add styles here
  
}


function spawnObs(){
  if(frameCount % 160 === 0){ 
    spike = createSprite(1200,570,10,10); 
    spike.debug = true; 
    spike.setCollider("rectangle",0,0,150,150); 
    spike.addImage(spikeIMG);  
    spike.scale = 0.15; 
    spike.velocityX = -3; 
    spike.lifetime= 240;
    spikeGroup.add(spike);

  }
}
function spawnBumps(){
  if(frameCount % 200 === 0) {
    bumps = createSprite(1200,595,10,10); 
    bumps.velocityX = -3;  
    bumps.addImage(bumpIMG); 
    bumps.scale = 0.1;
    bumps.lifetime = 240; 
    bumpGroup.add(bumps);
  }
} 
function spawnCoins(){
  if(frameCount % 200 ===0) {
    coin = createSprite(1200,random(350,400),10,10); 
    coin.addImage(coinIMG); 
    coin.scale = 0.2;  
    coin.velocityX = -3;  
    coin.lifetime = 240;
    coinGroup.add(coin);
    
    
  }
}