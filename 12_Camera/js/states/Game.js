
Tutorial.Game = function (game)
{

  this.gravity = 1200;
  this.moveVelocity = 250;
  this.jumpVelocity = 400;

  /* members */

  this.char;
  this.runDirection = "right";

  this.cursors;
  this.buttons;

  this.customBottomBound; // raised stage ground

  this.showBox = false; // bounding box

  this.ScoreText;
  this.score = 0;


};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // background
    let bg = this.add.sprite(0, 0,'bg');
    bg.height = this.world.height;
    // adjust worldbounds to image width
    this.world.setBounds(0, 0, this.cache.getImage('bg').width, this.world.height);

    // char and animations
    this.char = this.add.sprite(50,this.world.height * 0.80, 'hatman'); // knowing the coords, the char can be added
    this.char.anchor.setTo(0.5,0.5);
    this.char.animations.add('run_right');
    // physics
    this.physics.arcade.enable(this.char);
    this.char.body.collideWorldBounds = true;
    this.char.body.gravity.y = this.gravity;
    // keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // score (fixed to camera)
    let scorePos = {x: 32, y:  32};
    this.ScoreText = this.add.text(scorePos.x, scorePos.y, "Score: " + this.score, { font: "32px Arial", fill: "#f26c4f", align: "left" });
    this.ScoreText.fixedToCamera = true;
    this.ScoreText.cameraOffset.setTo(scorePos.x, scorePos.y);

    // arcade physics invisible ground (http://www.html5gamedevs.com/topic/6194-invisible-walls/)
    this.customBottomBound = this.add.sprite(0, this.world.height * 0.87);
    this.game.physics.arcade.enable(this.customBottomBound);
    this.customBottomBound.body.width = this.world.width;
    this.customBottomBound.body.immovable = true;
    this.customBottomBound.collideWorldBounds = true;
    this.customBottomBound.allowGravity = false;

    // camera: set to follow player (follow styles: https://phaser.io/examples/v2/camera/follow-styles)
    this.camera.follow(this.char, Phaser.Camera.FOLLOW_PLATFORMER);

    // debug
    this.buttons = this.input.keyboard.addKeys({
      debug: Phaser.KeyCode.D,
      jump: Phaser.KeyCode.SPACEBAR
    });
    this.buttons.debug.onDown.add(() => {this.showBox = !this.showBox},this);

  },
  update: function()
  {

    // collide with lower custom lower world bound
    this.game.physics.arcade.collide(this.char, this.customBottomBound);

    this.char.body.velocity.x = 0;

    // cursor controls
    if (this.cursors.right.isDown)
    {
      this.changeDirection('right'); // flip character
      if (!this.char.animations.isPlaying) this.char.animations.play('run_right', 8, false);
      this.char.body.velocity.x = this.moveVelocity;;
    }
    else if (this.cursors.left.isDown)
    {
      this.changeDirection('left'); // flip character
      this.char.animations.play('run_right');
      this.char.body.velocity.x = -this.moveVelocity;
    }
    else this.char.animations.stop();

    // jumping
    if (this.buttons.jump.isDown && (this.char.body.onFloor() || this.char.body.touching.down))
    {
        this.char.body.velocity.y = -this.jumpVelocity;
        this.score++;
        this.ScoreText.text = "Score: " + this.score;
    }

  },
  // flip character's walking direction
  changeDirection: function(direction)
  {
    // flip sprite
    if (this.runDirection !== direction)
    {
      this.char.scale.x *= -1;
      this.runDirection = direction;
    }
  },
  render: function()
  {

    // debug text output
    this.game.debug.text( "Move Character with [L,R] arrow keys, [D] to toggle debug info.", 5, Tutorial.SCREEN_HEIGHT - 10 );

    if (!this.showBox) return;

    this.game.debug.cameraInfo(this.camera, 32, 32);
    this.game.debug.spriteBounds(this.char);

  }
};
