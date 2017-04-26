
Tutorial.Game = function (game)
{
  /* members */
  this.cursors;
  this.tileSprite;
  this.tileSpriteOutline;
  this.showOutline = false;
  this.showOutlineButton;
};

Tutorial.Game.prototype =
{
  // called every time a state switch takes place
  create: function ()
  {

    // add tilesprite to game with scale this.world.width x this.world.height
    this.tileSprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'tex_starfield');
    // debugoutline for tilesprite - order matters here: it gets placed over previous tilesprite
    // (use Phaser.Groups to control z-properties)
    this.tileSpriteOutline = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'tex_starfield_outline');
    this.tileSpriteOutline.visible = this.showOutline; // hide/show outline, alternative: this.tileSpriteOutline.alpha = 0;

    // key controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.showOutlineButton = this.input.keyboard.addKey(Phaser.KeyCode.S);

    // IMPORTANT: remove this added function again on state shutdown (see below),
    // as this.game.input.resetLocked is enabled (see Load.js),
    // which allows NOT AUTOMATICALLY clearing keys across states, which is problematic
    // for handling keys repeatedly called functions:
    // create is called on every state switch, which would lead to adding
    // the same function over and over to this.showOutlineButton.onDown
    this.showOutlineButton.onDown.add(
      () =>
      {
        this.showOutline = !this.showOutline;
        this.tileSpriteOutline.visible = this.showOutline; // change outline visibility
      }, this);

  },
  update: function()
  {

    // Tilesprite moving with arrows
    if (this.cursors.left.isDown)
    {
        this.tileSprite.tilePosition.x += 8;
        this.tileSpriteOutline.tilePosition.x += 8;
    }
    else if (this.cursors.right.isDown)
    {
        this.tileSprite.tilePosition.x -= 8;
        this.tileSpriteOutline.tilePosition.x -= 8;
    }

    if (this.cursors.up.isDown)
    {
      this.tileSprite.tilePosition.y += 8;
      this.tileSpriteOutline.tilePosition.y += 8;
    }
    else if (this.cursors.down.isDown)
    {
      this.tileSprite.tilePosition.y -= 8;
      this.tileSpriteOutline.tilePosition.y -= 8;
    }
  },
  render: function ()
  {
    // debug text output
    let outlineTxt = this.showOutline ? "hide" : "show";
    this.game.debug.text( "Press [1,2,3] to switch game states.", 5, this.world.height - 30 );
    this.game.debug.text( "Move Tilesprite with the [L,R,U,D] arrow keys. Press [S] to "+outlineTxt+" tile outline.", 5, this.world.height - 10 );
  },
  // called every time we switch from this state to another one
  shutdown: function ()
  {
    // clear all functions added to this.showOutlineButton.onDown (why? see create)
    this.showOutlineButton.onDown.removeAll();
  }
};
