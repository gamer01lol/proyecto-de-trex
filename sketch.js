var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restart
var game_over
var restart_image
var game_over_image

var play = 1;
var end = 0;
var gamestate = play;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  game_over_image = loadImage("gameOver.png")
  restart_image = loadImage("restart.png")
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  restart = createSprite(300,140);
  restart.addImage(restart_image);
  game_over = createSprite(300,100);
  game_over.addImage(game_over_image);

  restart.scale = 0.5 

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hola" + 5);

  trex.setCollider("circle",0,0,40);
  trex.debug = true;

  score = 0;
}

function draw() {
  background(180);
  text("Puntuación: "+ score, 500,50);
  
  if(gamestate === play) {
    restart.visible = false
    game_over.visible = false
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
    }
    
    trex.velocityY = trex.velocityY + 0.8

    //aparecer nubes
  spawnClouds();
  
    //aparecer obstáculos en el suelo
  spawnObstacles();
  if(obstaclesGroup.isTouching(trex))(
    gamestate = end
  )
  }
  else if(gamestate === end) {
  ground.velocityX = 0;
  trex.changeAnimation("collided",trex_collided)
  restart.visible = true
   game_over.visible = true
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);

  }

  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar escala y lifetime al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
 }
}




function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar lifetime a la variable
    cloud.lifetime = 200;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }

}
