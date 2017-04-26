
Tutorial.Game = function (game)
{
  /* members */

  // keys, audio
  this.cursors;
  this.npcSpawnButton;
  this.coinSpawnButton;
  this.sfx;

  // anims
  this.hatmans = []; // {sprite, direction, tween} dictionary array for random movement
  this.character;

  // display groups
  this.backGroup;
  this.middleGroup;
  this.frontGroup;
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // add wood tilesprite to state
    let bg = this.add.tileSprite(0, 0, Tutorial.SCREEN_WIDTH, Tutorial.SCREEN_HEIGHT, 'wood');
    bg.tileScale.setTo(0.3); // set tilesprite scale

    // display groups (npcs: front, character: middle, coins: back)
    this.backGroup = this.add.group();
    this.middleGroup = this.add.group();
    this.frontGroup = this.add.group();

    // [1] character using single animation
    // spawn hatman on button press
    this.npcSpawnButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
    this.npcSpawnButton.onDown.add(
      () =>
      {
        // INFO: get sprite frame before atlas is loaded, getFrameByName could as well be used for NameString
        // let unloadedFrame = this.cache.getFrameData('hatman').getFrame(0);

        // add char to state
        let sprite = this.frontGroup.create(0,0, 'hatman'); // knowing the coords, the char can be added
        sprite.anchor.setTo(0.5,0.5);
        // get Random world bounds, considering the sprite dimensions
        let rndCoords = this.calcRndCoords(sprite);
        sprite.position.setTo(rndCoords.x, rndCoords.y); // re-position sprite randomly
        // adding animations to character defining animation id 'run_right'
        // not specifying any frames means using all in spritesheet
        sprite.animations.add('run_right');
        // change sprite's texture on click ('run_right' will then use all frames from martian sheet)
        sprite.inputEnabled = true; // enable click events on sprite
        sprite.events.onInputDown.add(
        () =>
        {
          sprite.loadTexture('martian'); // change texture
          sprite.animations.play('run_right'); // restart animation
        }, this);

        let dictEntry = {'sprite': sprite, 'direction': 'right', 'tween': null};
        this.hatmans.push(dictEntry);
      }, this);

    // [2] character using multiple animations in one sheet
    this.character = this.middleGroup.create(this.world.centerX, this.world.centerY, 'character'); // add char to state
    this.character.smoothed = false; // disable smoothing, else pixelart appears blurry on scale
    this.character.scale.setTo(4.0);
    // create animations (4 for every direction -> see orig/animated_character.png)
    this.character.animations.add('down', [0, 1, 2, 3], 10, true);
    this.character.animations.add('right', [4, 5, 6, 7], 10, true);
    this.character.animations.add('left', [8, 9, 10, 11], 10, true);
    this.character.animations.add('up', [12, 13, 14, 15], 10, true);
    // character physics
    this.game.physics.p2.enable(this.character);
    this.character.body.fixedRotation = true; // disable collisions rotating character
    // character keys, audio
    this.cursors = this.input.keyboard.createCursorKeys();
    this.sfx =
    {
      steps: [this.add.audio('step1'), this.add.audio('step2')]
    };

    // [3] dynamic animation
    // make silver coin sprite using GameObjectCreator (make), does not add it to game
    let coin = this.make.sprite(0, 0, 'coin');
    let xAnchor = 0.5;
    coin.anchor.setTo(xAnchor, 0);
    let num_frames = 32;
    let spriteWidth = this.cache.getImage('coin').width;
    let spriteHeight = this.cache.getImage('coin').height;

    // First create a BitmapData object at the size we need (1
    let bmd = this.add.bitmapData(spriteWidth * num_frames, spriteHeight);
    let xPos = spriteWidth*xAnchor;
    let yPos = 0;
    for (let i = -num_frames/2; i < num_frames/2; i++)
    {
        let newScale = i/(num_frames/2-1);
        coin.scale.setTo(newScale,1.0);
        bmd.draw(coin, xPos, yPos);
        xPos += spriteWidth;
    }
    // DEBUG: shows above drawn bitmap data
    // this.add.image(0, 0, bmd);
    this.cache.addSpriteSheet('dynamic', '', bmd.canvas, spriteWidth, spriteHeight, num_frames, 0, 0);
    // dynamic animation keys
    this.coinSpawnButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.coinSpawnButton.onDown.add(() => {this.spawnCoin();}, this);


  },
  update: function ()
  {
    // handle onscreen hatmans
    this.controlHatmans();
    // handle character mmovement via arrow keys
    this.controlCharacter();

  },
  // [1] randomly moves all onscreen hatmans
  controlHatmans: function()
  {
    // create new movement tweens for every hatman
    for (let i=0;i<this.hatmans.length; i++)
    {
      let entry = this.hatmans[i];
      // check if a tween is currently added to hatman
      if (entry.tween == null)
      {
        // create tween with random coordinates on world
        let rndCoords = this.calcRndCoords(entry.sprite);

        // easing options: http://phaser.io/docs/2.6.2/Phaser.Easing.html
        entry.tween = this.add.tween(entry.sprite).to({x: rndCoords.x, y: rndCoords.y}, 1000 + Math.random() * 3000, Phaser.Easing.LINEAR);
        entry.tween.onComplete.add(
          () =>
          {
            // if movement finished cleanup tween
            this.tweens.remove(entry.tween); // remove from game
            entry.tween = null;
            entry.sprite.animations.stop(); // stop walking
          }, this);
        entry.sprite.animations.play('run_right', 8, true); // anim name, fps: controls speed of anim, loop
        // change sprite direction depending on tween movement
        if (entry.sprite.position.x < rndCoords.x) this.changeDirection(entry, 'right');
        else this.changeDirection(entry, 'left');
        entry.tween.start();
      }
    }

  },
  // [1] calculates random coordinates for sprite world positioning
  calcRndCoords: function(sprite)
  {
    // calculate sprite dims next to left,right,above,below anchor points
    // Math.abs: ensure positive values - flipped sprites have negative dimensions
    let xAnchorLeft = sprite.anchor.x * Math.abs(sprite.width);
    let xAnchorRight = Math.abs(sprite.width) - xAnchorLeft;
    let yAnchorAbove = sprite.anchor.y * Math.abs(sprite.height);
    let yAnchorBelow = Math.abs(sprite.height) - yAnchorAbove;
    let rndX = this.rnd.integerInRange(0 + xAnchorLeft, this.world.width - xAnchorRight);
    let rndY = this.rnd.integerInRange(0 + yAnchorAbove, this.world.height - yAnchorBelow);
    return {x: rndX, y: rndY};
  },
  // [1] flip hatmans walking direction
  changeDirection: function(entry, direction)
  {
    // flip sprite
    if (entry.direction !== direction)
    {
      entry.sprite.scale.x *= -1;
      entry.direction = direction;
    }
  },
  // [2] cursor controls for playable character
  controlCharacter: function ()
  {
    // reset velocity
    this.character.body.setZeroVelocity();
    let moving = false;

    if (this.cursors.left.isDown)
    {
      this.character.animations.play('left');
      moving = true;
      // equivalent: player.body.velocity.x = 300;
      this.character.body.moveLeft(300);
    }
    else if (this.cursors.right.isDown)
    {
      this.character.animations.play('right');
      moving = true;
      this.character.body.moveRight(300);
    }

    if (this.cursors.up.isDown)
    {
      if (!moving) this.character.animations.play('up');

      moving = true;
      this.character.body.moveUp(300)
    }
    else if (this.cursors.down.isDown)
    {
      if (!moving) this.character.animations.play('down');
      moving = true;
      this.character.body.moveDown(300)
    }

    if (moving) this.playStepSound();
    else this.character.animations.stop();
  },
  // [2] plays a randomly chosen foot step sound
  playStepSound: function()
  {
    for (let i=0;i<this.sfx.steps.length; i++)
    {
      // if a step effect is already playing exit
      if (this.sfx.steps[i].isPlaying) return;
    }
    // pick random step sound and play
    let rndStep = this.rnd.pick(this.sfx.steps);
    rndStep.play();
  },
  // [3] spawn animated coin at player's location
  spawnCoin: function ()
  {
    let playerX = this.character.position.x;
    let playerY = this.character.position.y;
    var animatedCoin = this.backGroup.create(playerX, playerY, 'dynamic');
    animatedCoin.anchor.setTo(0.5);
    animatedCoin.smoothed = false;
    animatedCoin.scale.setTo(5.0);
    animatedCoin.animations.add('float');
    animatedCoin.play('float', 20, true);
  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Move with [L,R,U,D] arrow keys and press [SPACE] to spawn a coin.", 5, Tutorial.SCREEN_HEIGHT - 30);
    this.game.debug.text("Press [S] to spawn an NPC character and click on it to change its texture.", 5, Tutorial.SCREEN_HEIGHT - 10);

  }
};
