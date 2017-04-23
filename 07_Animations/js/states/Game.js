
Tutorial.Game = function (game)
{
  /* members */
  this.cursors;
  this.character;
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // add repeating background to state
    let bg = this.add.tileSprite(0, 0, Tutorial.SCREEN_WIDTH, Tutorial.SCREEN_HEIGHT, 'wood');
    bg.tileScale.setTo(0.3); // set tilesprite scale

    // add char to state
    this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');
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

    // keys
    this.cursors = this.input.keyboard.createCursorKeys();
  },
  update: function ()
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

    if (!moving) this.character.animations.stop();

  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Move with [L,R,U,D] arrow keys.", 5, Tutorial.SCREEN_HEIGHT - 10);
  }
};
