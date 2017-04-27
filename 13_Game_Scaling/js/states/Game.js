
Tutorial.Game = function (game)
{
  /* members */
  this.cursorkeys;
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    let cacheImg = this.cache.getImage('bg');
    let origW = cacheImg.width;
    let origH = cacheImg.height;
    let bg = this.add.sprite(0,0, 'bg');
    let ratio = this.world.height / origH;
    bg.height = this.world.height;
    bg.width = origW * ratio;
    //  adjust world bounds to bg size
    this.world.setBounds(0, 0, bg.width, 600);


    this.cursorkeys = this.input.keyboard.createCursorKeys();

  },
  update: function()
  {
    if (this.cursorkeys.right.isDown)
    {
      this.camera.x += 4;
    }
    else if (this.cursorkeys.left.isDown)
    {
      this.camera.x -= 4;
    }
  },
  render: function()
  {
    // debug text output
    this.game.debug.text( "Use [L,R] arrow keys to scroll.", 5, Tutorial.SCREEN_HEIGHT - 10 );
  }
};
