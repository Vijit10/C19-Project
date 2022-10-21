var PLAY = 1
var END = 0
var gameState = PLAY
var player, player_running, player_collided
var ground, invisibleGround, groundImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200)
  player = createSprite(50,160,20,50)
  player.scale = 0.8
  ground = createSprite(200,180,400,20)
  ground.addImage("ground",groundImage)
  ground.x = ground.width /2
  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImg)
  restart = createSprite(300,140)
  restart.addImage(restartImg)
  gameOver.scale = 0.5
  restart.scale = 0.5
  invisibleGround = createSprite(200,190,400,10)
  invisibleGround.visible = false
  obstaclesGroup = createGroup()
  player.setCollider("rectangle",0,0,player.width,player.height)
  score = 0
}

function draw() {
  background(180)
  text("Score: "+ score, 500,50)
  console.log(gameState)
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false 
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60)        
    if (ground.x < 0){
      ground.x = ground.width/2
    }   
    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -12
    } 
    player.velocityY = player.velocityY + 0.8     
    spawnObstacles()
    if(obstaclesGroup.isTouching(player)){    
        jumpSound.play()
        gameState = END
        dieSound.play()   
    }
  }
   else if (gameState === END) {
      gameOver.visible = true
      restart.visible = true   
      ground.velocityX = 0
      player.velocityY = 0     
    obstaclesGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0)
   }
   player.collide(invisibleGround)
  if(mousePressedOver(restart)) {
      reset()
    }
  drawSprites()
}

function reset(){
  restart.visible = false
  gameOver.visible = false
  score = 0 
  obstaclesGroup.destroyEach()
  gameState = PLAY
  console.log(gameState)
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40)
   obstacle.velocityX = -(6 + score/100)
    var rand = Math.round(random(1,6))
    switch(rand) {
      case 1: obstacle.addImage(obstacle1)
              break
      case 2: obstacle.addImage(obstacle2)
              break
      case 3: obstacle.addImage(obstacle3)
              break
      case 4: obstacle.addImage(obstacle4)
              break
      case 5: obstacle.addImage(obstacle5)
              break
      case 6: obstacle.addImage(obstacle6)
              break
      default: break
    }       
    obstacle.scale = 0.5
    obstacle.lifetime = 300
    obstaclesGroup.add(obstacle)
 }
}


