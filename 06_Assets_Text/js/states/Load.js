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
    //progressBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    // assets

    // Google Web Font

    // Google's Loader Script (see js/states/Load.js) needs config object,
    // hence it needs to be created first
    WebFontConfig = {
        // before starting game State (startGame) set 1 second delay after all requested
        // fonts finished loading (=active), otherwise the browser cannot render
        // the text the first time it's created
        // (cf. http://www.html5gamedevs.com/topic/4225-how-do-you-use-a-webfont-in-phaser-exactly/)
        active: () => { this.time.events.add(Phaser.Timer.SECOND, this.startGame, this); }, // arrow function to avoid var self = this;
        // Actual Font: pick one at https://fonts.google.com/
        google:
        {
          families: ['Sofia']
        }
    };
    //  Load Google WebFont Loader script
    this.load.script('sofiawebfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    // Bitmap Font (font spritesheet and map file)
    this.load.bitmapFont('desyrel', 'assets/fonts/bitmap_font/desyrel.png', 'assets/fonts/bitmap_font/desyrel.xml');

  },
  startGame: function ()
  {
    console.log("Google Font Loaded!");
    // start next state
    this.state.start('Game');
  },
  loadUpdate: function()
  {
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  create: function()
  {
    // do nothing here - wait for font loading delay
  }
};
