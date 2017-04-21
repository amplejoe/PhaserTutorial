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
      this.world.centerY + 30, 'progressBar');
    //progressBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    // assets
    this.load.image('logo', 'assets/sprites/phaser.png');
    this.load.image('player', 'assets/sprites/phaser-dude.png');
    this.load.image('platform', 'assets/sprites/platform.png');
    // load some assets to slow down loading screen (requires internet)
    numImages = 10 // increase until you see the progress bar
    for (let i=0;i<numImages;i++)
      this.load.image('dummy'+i, "http://loremflickr.com/"+(320+i)+"/"+(240+i));
  },
  create: function()
  {
    // start Title state
    this.state.start('Title');
  }
};
