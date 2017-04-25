
Tutorial.Game = function (game)
{
  /* members */
  this.cursors;
  this.tileSprite;
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    // add tilesprite to game with scale this.world.width x this.world.height
    this.tileSprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'tex_starfield');

    this.cursors = this.input.keyboard.createCursorKeys();

    // debug text output
    this.game.debug.text( "Change scrolling direction with [L,R,U,D] arrow keys.", 5, this.world.height - 10 );
  },
  update: function() {

    // Move tilesprite position by pressing arrow keys
    if (this.cursors.left.isDown)
    {
        this.tileSprite.tilePosition.x += 8;
    }
    else if (this.cursors.right.isDown)
    {
        this.tileSprite.tilePosition.x -= 8;
    }

    if (this.cursors.up.isDown)
    {
        this.tileSprite.tilePosition.y += 8;
    }
    else if (this.cursors.down.isDown)
    {
        this.tileSprite.tilePosition.y -= 8;
    }

}
};
