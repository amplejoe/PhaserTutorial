Tutorial.Load = function(game)
{
  // label for displaying loading information
  this.loadingLabel;
};

Tutorial.Load.prototype =
{
  preload: function()
  {
    // loading text
    this.loadingLabel = this.add.text(this.world.centerX, this.world.centerY, 'loading - 0%',
    {
      font: '30px Arial',
      fill: '#ffffff'
    });
    this.loadingLabel.anchor.setTo(0.5, 0.5);

    // progress bar
    let progressBar = this.add.sprite(this.world.centerX - (0.5 * this.cache.getImage('progressBar').width),
      this.world.centerY + 30, 'progressBar');
    let progressBarOutline = this.add.sprite(this.world.centerX - (0.5 * this.cache.getImage('progressBarOutline').width),
      this.world.centerY + 30, 'progressBarOutline');
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    // assets
    this.load.image('bg', 'assets/kenney_physicsAssets_v2/bgs/colored_desert.png');
    this.load.atlasXML('aliens', 'assets/kenney_physicsAssets_v2/Spritesheet/spritesheet_aliens.png','assets/kenney_physicsAssets_v2/Spritesheet/spritesheet_aliens.xml' );
    this.load.atlasXML('stones', 'assets/kenney_physicsAssets_v2/Spritesheet/spritesheet_stone.png','assets/kenney_physicsAssets_v2/Spritesheet/spritesheet_stone.xml' );

    this.game.load.physics("physics", "assets/data.json");

  },
  loadUpdate: function()
  {
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  create: function()
  {
    // start next state
    this.state.start('Game');
  }
};
