
Tutorial.Game = function (game)
{
  /* members */
  this.cursorkeys;
  this.keys;

  // scalemanager modes (http://phaser.io/docs/2.6.2/Phaser.ScaleManager.html)
  this.currentMode = 0;
  this.scaleModesTxt = [" NO_SCALE", "SHOW_ALL", "EXACT_FIT", "RESIZE", "USER_SCALE"];
  this.scaleModes = [ Phaser.ScaleManager.NO_SCALE, Phaser.ScaleManager.SHOW_ALL, Phaser.ScaleManager.EXACT_FIT, Phaser.ScaleManager.RESIZE, Phaser.ScaleManager.USER_SCALE];
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // background
    let cacheImg = this.cache.getImage('bg');
    let origW = cacheImg.width;
    let origH = cacheImg.height;
    let bg = this.add.sprite(0,0, 'bg');
    // set bg w & h
    let ratio = this.world.height / origH;
    bg.height = this.world.height;
    // set width accordint to height scale ratio,
    // as to keep picture aspect ratio
    bg.width = origW * ratio;
    bg.smoothed = false; // disable smoothing
    //  adjust world bounds to bg size
    this.world.setBounds(0, 0, bg.width, 600);

    // display adjust keys
    this.keys = this.input.keyboard.addKeys(
      {
        toWinHeight: Phaser.KeyCode.S
      });
    this.keys.toWinHeight.onDown.add(
      ()=>
      {
        this.currentMode++;
        this.currentMode %= this.scaleModes.length;

        this.game.scale.scaleMode = this.scaleModes[this.currentMode];

        // custom scale for user scale mode
        if (this.game.scale.scaleMode == Phaser.ScaleManager.USER_SCALE)
        {
          // INFO: Phaser calculates USER_SCALE the following way:
          // canvas.width = (game.width * hScale) - hTrim
          // canvas.height = (game.height * vScale) - vTrim
          // (cf. http://phaser.io/docs/2.6.2/Phaser.ScaleManager.html#setUserScale)
          this.game.scale.setUserScale(0.7, 0.7, 1.0, 0); // use 1.5 for horizontal/vertical scaling factors

          // horizontal/vertical page alignment on
          this.game.scale.pageAlignVertically = true;
          this.game.scale.pageAlignHorizontally = true;

        }
        else
        {
          // horizontal/vertical page alignment off
          this.game.scale.pageAlignVertically = false;
          this.game.scale.pageAlignHorizontally = false;
        }

        // queue layout refresh in scale manager
        // this.game.scale.refresh();
      }
      ,this);


    // scrolling cursors
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
    let modeText = this.scaleModesTxt[this.currentMode];
    // INFO: use scale.height here as a workaround - somehow debuginfo is not shown below scale.height in USER_MODE 
    this.game.debug.text( "Use [L,R] arrow keys to scroll.", 5, this.scale.height - 30 );
    this.game.debug.text( "Press [S] to toggle scale manager - mode: "+modeText, 5, this.scale.height - 10 );

    // shows current scaled height
    // console.log(this.scale.height);
  }
};
