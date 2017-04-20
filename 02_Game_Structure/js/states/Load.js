Tutorial.Load = function(game) {};

Tutorial.Load.prototype =
{
  preload: function()
  {
    // loading text
    var loadingLabel = this.add.text(this.world.centerX, this.world.centerY, 'loading...',
    {
      font: '30px Arial',
      fill: '#ffffff'
    });
    loadingLabel.anchor.setTo(0.5, 0.5);

    // progress bar
    var progressBar = this.add.sprite(this.world.centerX - (0.5 * this.cache.getImage('progressBar').width),
      this.world.centerY + 50, 'progressBar');
    //progressBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    // assets
    this.load.image('logo', 'assets/sprites/phaser.png');
    this.load.image('player', 'assets/sprites/phaser-dude.png');
    this.load.image('platform', 'assets/sprites/platform.png');
    // load some bigger assets to slow down loading screen (requires internet)
    this.load.image('hq1',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Phanom_Rung_Wikimedia_Commons.jpg/1280px-Phanom_Rung_Wikimedia_Commons.jpg');
    this.load.image('hq2',
      'https://upload.wikimedia.org/wikipedia/commons/a/a6/World_Bank_building_at_Washington.jpg');
    this.load.image('hq3',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Lake_Kinney_mit_Mount_Whitehorn.jpg/1024px-Lake_Kinney_mit_Mount_Whitehorn.jpg');
    this.load.image('hq4',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cappadocia_Chimneys_Wikimedia_Commons.jpg/1024px-Cappadocia_Chimneys_Wikimedia_Commons.jpg');
  },
  create: function()
  {
    // start Title state
    this.state.start('Title');
  }
};
