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

    // background
    this.load.image('wood', 'assets/sprites/textures/wood_by_EricHart3d.png');

    // TODO: JSON mapped atlas flying bird using all sprites as animation
    //this.game.load.atlasJSONHash("BIRD_FLYING",  Config.SPRITE_SHEETS_PATH+"bird.png",  Config.SPRITE_SHEETS_PATH+"bird_flying.json"); // sprite sheets

    // load atlas and corresponding XML (XML should be in UTF-8)
    this.load.atlasXML('character', 'assets/sprites/anims/XML_Character/char_anim.png', 'assets/sprites/anims/XML_Character/char_anim.xml');


  },
  loadUpdate: function()
  {
    //console.log("Loading progress: " + this.load.progress + "%");
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  create: function()
  {
    // start next state
    this.state.start('Game');
  }
};
