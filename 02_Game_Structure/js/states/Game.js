
Tutorial.Game = function (game)
{
  /* members */
  this.player;
  this.platforms;
  // buttons
  this.cursors;
  this.jumpButton;
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // character
    this.player = this.add.sprite(100, 200, 'player');

    // physics
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 500;
    this.platforms = this.add.physicsGroup();

    // platforms
    this.platforms.create(500, 150, 'platform');
    this.platforms.create(-200, 300, 'platform');
    this.platforms.create(400, 450, 'platform');
    this.platforms.setAll('body.immovable', true);

    // buttons
    this.cursors = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function ()
  {
    // collisions
    this.physics.arcade.collide(this.player, this.platforms);
    this.player.body.velocity.x = 0;

    // movement
    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -250;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 250;
    }

    // jumping
    if (this.jumpButton.isDown && (this.player.body.onFloor() || this.player.body.touching.down))
    {
        this.player.body.velocity.y = -400;
    }
  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Move with [L,R] arrow keys and jump with [SPACE].", 5, Tutorial.SCREEN_HEIGHT - 10);
  }
};
