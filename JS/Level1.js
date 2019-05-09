Game.Level1 = function(game){

}


var map ;
var layer ;

var player ;
var controls  = {} ;
var playerSpeed = 150 ; 
 
var enemies  ; 
var bullets ; 
var bulletTime = 0 ; 
var fireButton ; 


var score = 0 ; 
var scoreText ; 
var winText ; 
var messages = [
"link in an email to redirect user to an unsecure website. \n Deploy a SPAM filter that detects viruse.",
"Occurs when in input, like their username/userid, \n the attacker gives you an SQL statement that you will unknowingly run on your database. \n Use SQL parameters",
"Attackers to inject client-side scripts into web pages. \n Input validations for each field.",
"Attacker secretly relays and possibly alters the communications. \n Use HTTPS and certificates.",
"Malicious software performs activities on the victim's computer. \n Install anti virus.",
"Attacker seeks to make a machine or network resource unavailable. \n Use reverse proxy.",
"Email scam targeted towards a specific individual. \ Dont open or reply back.",
"Attack that is specifically aimed at wealthy, powerful, or prominent individuals. \n Dont open or reply back suspicious emails.",
"Illegal entry to a computer system that uses a dictionary headword list \n to generate possible passwords. \n Loack accounts, reset passwords."];
var messagesCount = 0;
var currentMsg = messages[0];

Game.Level1.prototype = {
	preload : function(){
		//Load Enemy
		this.load.image('enemy2','../assets/enemy2.png')
		this.load.image('enemy3','../assets/enemy3.png')
		this.load.image('enemy4','../assets/enemy4.png')
		this.load.image('enemy5','../assets/enemy5.png')
		this.load.image('enemy6','../assets/enemy6.png')
		this.load.image('enemy7','../assets/enemy7.png')
		this.load.image('enemy8','../assets/enemy8.png')
		this.load.image('enemy9','../assets/enemy9.png')
		this.load.image('enemy10','../assets/enemy10.png')
		this.load.image('bullet','../assets/Bullet1.png')
	},


	create : function(){
		
		this.add.tileSprite(0, 0, 640, 640, 'background');

		

		// The enemy's bullets
	    bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);



	   enemies2 = this.add.group();
	   enemies2.enableBody = true;
	   enemies2.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies3 = this.add.group();
	   enemies3.enableBody = true;
	   enemies3.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies4 = this.add.group();
	   enemies4.enableBody = true;
	   enemies4.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies5 = this.add.group();
	   enemies5.enableBody = true;
	   enemies5.physicsBodyType = Phaser.Physics.ARCADE;



	   enemies6 = this.add.group();
	   enemies6.enableBody = true;
	   enemies6.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies7 = this.add.group();
	   enemies7.enableBody = true;
	   enemies7.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies8 = this.add.group();
	   enemies8.enableBody = true;
	   enemies8.physicsBodyType = Phaser.Physics.ARCADE;

	   enemies9 = this.add.group();
	   enemies9.enableBody = true;
	   enemies9.physicsBodyType = Phaser.Physics.ARCADE;



	   enemies10 = this.add.group();
	   enemies10.enableBody = true;
	   enemies10.physicsBodyType = Phaser.Physics.ARCADE;

	   this.createEnemies();

		//this.physics.arcade.gravity.y = 1400 ; 

		map = this.add.tilemap('map');
		

		map.addTilesetImage('tileset');
		

		layer = map.createLayer(0) ;
		layer.resizeWorld() ; 

		
		map.setCollisionBetween(0 , 500);
		map.setCollision([155,135] , false) ; 

		map.setTileIndexCallback(0 , this.resetPlayer , this );
		map.setTileIndexCallback(2 , this.getCoin , this );
		

		player = this.add.sprite(75 , 800 , 'player');
		player.anchor.setTo(0.5,0.5);
		
		



		player.animations.add('idle' , [0,1] , 1 , true);
		player.animations.add('jump' , [2] , 1 , true);
		player.animations.add('run' , [3,4,5,6,7,8,9] , 7 , true);
		this.physics.arcade.enable(player);
		this.camera.follow(player);

		player.body.collideWorldBounds = true ;

		controls = {
			right : this.input.keyboard.addKey(Phaser.Keyboard.D),
			left : this.input.keyboard.addKey(Phaser.Keyboard.A),
			up : this.input.keyboard.addKey(Phaser.Keyboard.W),
			down : this.input.keyboard.addKey(Phaser.Keyboard.S),
			fireButtonI : this.input.keyboard.addKey(Phaser.Keyboard.I),
			fireButtonJ : this.input.keyboard.addKey(Phaser.Keyboard.J),
			fireButtonK : this.input.keyboard.addKey(Phaser.Keyboard.K),
			fireButtonL : this.input.keyboard.addKey(Phaser.Keyboard.L),
		};

		
		scoreText = this.add.text(800,50,'Score' , {font : '32px Arial' , fill : '#fff'});
		//winText = this.add.text(this.world.centerX , this.world.centerY , currentMsg,  {font : '32px Arial' , fill : '#fff'} ) ; 
		//winText.visible = false ; 

	},

	update : function(){
		this.physics.arcade.collide(player , layer);

		player.body.velocity.x = 0 ;
		player.body.velocity.y = 0 ;


		this.physics.arcade.overlap(bullets , enemies2 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies3 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies4 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies5 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies6 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies7 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies8 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies9 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(bullets , enemies10 , this.collisionHandler , null , this) ; 
		this.physics.arcade.overlap(player , enemies2 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies3 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies4 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies5 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies6 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies7 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies8 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies9 , this.collisionHandlerForPlayer , null , this) ; 
		this.physics.arcade.overlap(player , enemies10 , this.collisionHandlerForPlayer , null , this) ; 


		if(controls.up.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.y -= playerSpeed ;
		}

		if(controls.down.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.y += playerSpeed ;
		}		
		

		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x += playerSpeed ;
		}

		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x -= playerSpeed ;
		}		

		if(player.body.velocity.x == 0 && player.body.velocity.y ==0){
			player.animations.play('idle');
		}

		if(controls.fireButtonI.isDown){
				if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.y = -200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonJ.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = -200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonK.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.y = +200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}

		if(controls.fireButtonL.isDown){
			if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
					bullet.reset(player.x , player.y);
					bullet.body.velocity.x = +200 ; 
					bulletTime = this.time.now + 1000 ; 
				}
			}
		}


		scoreText.text = 'Score : ' + score ; 

		if(score == 9){
			//winText = this.add.text(this.world.centerX -300 , this.world.centerY , "You Win!",  {font : '24px Arial' , fill : '#fff'} ) ;
			// if(winText) winText.visible = true ; 
			// scoreText.visible = false ; 
		}

	},

	resetPlayer: function(){
		player.reset(100 , 700 ); 
	},

	getCoin : function(){
		map.putTile(-1 , layer.getTileX(player.x), layer.getTileY(player.y)) ;
	},

	collisionHandler : function(bullet , enemy ){
		console.log('Collision handler called '); 
		bullet.kill();
		enemy.kill() ; 
		score ++ ; 
		console.log("Score " , score ) ;
		console.log("winText " , winText ) ; 
		currentMsg = messages[messagesCount];
		messagesCount++;
		winText = this.add.text(this.world.centerX - 300, this.world.centerY , currentMsg,  {font : '24px Arial' , fill : '#fff'} ) ;
		setTimeout(function(){
			if(winText) winText.visible = false;
			winText = null;
		 }, 3000, game);
	},

	collisionHandlerForPlayer : function(player , enemy){
		this.resetPlayer() ; 
		winText = this.add.text(this.world.centerX -300 , this.world.centerY , "You Lost!",  {font : '24px Arial' , fill : '#fff'} ) ;
		setTimeout(function(){
			if(winText) winText.visible = false;
			winText = null;
		 }, 3000);
	},

	createEnemies : function(){

		var enemy2 = enemies2.create(48 , 48 , 'enemy2');
		enemy2.anchor.setTo(0.5,0.5);


		var enemy3 = enemies3.create(48 , 50 , 'enemy3');
		enemy3.anchor.setTo(0.5,0.5);

		var enemy4 = enemies4.create(48 , 48 , 'enemy4');
		enemy4.anchor.setTo(0.5,0.5);


		var enemy5 = enemies5.create(48 , 50 , 'enemy5');
		enemy5.anchor.setTo(0.5,0.5);

		var enemy6 = enemies6.create(48 , 48 , 'enemy6');
		enemy6.anchor.setTo(0.5,0.5);

		var enemy7 = enemies7.create(48 , 50 , 'enemy7');
		enemy7.anchor.setTo(0.5,0.5);

		var enemy8 = enemies8.create(48 , 48 , 'enemy8');
		enemy8.anchor.setTo(0.5,0.5);

		var enemy9 = enemies9.create(48 , 50 , 'enemy9');
		enemy9.anchor.setTo(0.5,0.5);

		var enemy10 = enemies10.create(48 , 48 , 'enemy10');
		enemy10.anchor.setTo(0.5,0.5);

		enemies2.x = 300;
		enemies2.y = 400 ;

		enemies3.x = 200;
		enemies3.y = 100 ;

		enemies4.x = 25;
		enemies4.y = 10 ;

		enemies5.x = 300;
		enemies5.y = 350 ;

		enemies6.x = 400;
		enemies6.y = 350 ;

		enemies7.x = 200;
		enemies7.y = 300 ;

		enemies8.x = 100;
		enemies8.y = 10 ;

		enemies9.x = 300;
		enemies9.y = 0 ;

		enemies10.x = 0;
		enemies10.y = 200 ;


		var tween2 = this.add.tween(enemy2).to({x : 100 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween2.onLoop.add(this.descend , this);
		var tween4 = this.add.tween(enemy4).to({x : 150 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween4.onLoop.add(this.descend , this);
		var tween6 = this.add.tween(enemy6).to({x : 250 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween6.onLoop.add(this.descend , this);
		var tween8 = this.add.tween(enemy8).to({x : 80 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween8.onLoop.add(this.descend , this);


		var tween3 = this.add.tween(enemy3).to({y : -200, x : 250 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween3.onLoop.add(this.descend , this);
		var tween5 = this.add.tween(enemy5).to({y : 350 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween5.onLoop.add(this.descend , this);
		var tween7 = this.add.tween(enemy7).to({y : 175 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween7.onLoop.add(this.descend , this);

		var tween9 = this.add.tween(enemy9).to({y : 90 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween9.onLoop.add(this.descend , this);
		var tween10 = this.add.tween(enemy10).to({y : 275 } , 2000 , Phaser.Easing.Linear.None, true , 0 , 1000, true);
		tween10.onLoop.add(this.descend , this);
	},

	descend : function(){
		enemies.y =+ 10 ; 
	},
	
	


}; 