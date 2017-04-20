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
    // load some big assets to slow down loading screen (requires internet)
    this.load.image('uhq1',
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Alte_Mainbr%C3%BCcke%2C_W%C3%BCrzburg%2C_North-West_View_20140604_1.jpg');
    this.load.image('uhq2',
      'https://upload.wikimedia.org/wikipedia/commons/3/38/Chicago_sunrise_3.jpg');
    this.load.image('uhq3',
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/Paris-pano-wladyslaw.jpg');

  },
  create: function()
  {
    // start Title state
    this.state.start('Title');
  }
};
