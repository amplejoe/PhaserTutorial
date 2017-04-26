
Tutorial.Game2 = function (game)
{
  /* members */
  this.cursors;
  this.tileSprite;

  // counters for effects using sine functions
  this.count = 0;
  this.scalecount = 0;

  this.caveSprite;
  this.showCave=false;
  this.showCaveButton;
  this.showWave=true;
  this.showWaveButton;
};

Tutorial.Game2.prototype =
{
  create: function ()
  {

    // add tilesprite to game with scale
    this.tileSprite = this.add.tileSprite(this.world.centerX, this.world.centerY,
      this.world.width, 0.45*this.cache.getImage('cave').height, 'tex_lava');
    this.tileSprite.anchor.setTo(0.5);

    this.caveSprite = this.add.sprite(this.world.centerX,this.world.centerY,"cave");
    this.caveSprite.anchor.setTo(0.5);
    this.caveSprite.visible = this.showCave; // change cave visibility

    // cave image
    this.showCaveButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
    this.showCaveButton.onDown.add(
      () =>
      {
        this.showCave = !this.showCave;
        this.caveSprite.visible = this.showCave; // change cave visibility
      }, this);
    // wave effect
    this.showWaveButton = this.input.keyboard.addKey(Phaser.KeyCode.W);
    this.showWaveButton.onDown.add( () => {this.showWave = !this.showWave;}, this);


  },
  update: function()
  {
    // funky tint effect (try at own risk ;) )
    //this.tileSprite.tint = Math.random() * 0xffffff;

    // wave effect
    this.count += 0.05;
    var y = Math.sin(this.count) * 50;
    if (this.showWave) this.tileSprite.tilePosition.y = y;

    // scale effect
    this.scalecount += 0.01;
    let cos = 0.3 * Math.cos(this.scalecount); // keep cosine between [-0.3,0.3]
    this.tileSprite.tileScale.y = 1.0 + cos; // scale between [-0.7,1.3]

    // flow direction
    this.tileSprite.tilePosition.x -= 5;
  },
  render: function ()
  {
    // debug text output
    this.game.debug.text( "Press [1,2,3] to switch game states.", 5, this.world.height - 30 );
    let caveTxt = this.showCave ? "hide" : "show";
    let waveTxt = this.showWave ? "stop" : "play";
    this.game.debug.text( "Press [S] to "+caveTxt+" cave sprite, [W] to "+waveTxt+" wave effect.", 5, this.world.height - 10 );
  },
  shutdown: function ()
  {
    // clear all functions added to buttons
    this.showCaveButton.onDown.removeAll();
    this.showWaveButton.onDown.removeAll();
  }
};
