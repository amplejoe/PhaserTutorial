Tutorial.Load = function(game)
{
  // label for displaying loading information
  this.loadingLabel;
  this.audioKeys;
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

    /** background **/
    this.load.image('wood', 'assets/sprites/textures/wood_by_EricHart3d.png');

    /** spritesheets containing animations (see spritesheet tutorial for more info) **/

    // single animation characters (hatman, martian)
    this.load.atlasJSONHash('hatman', 'assets/sprites/anims/JSON_Hatman/spritesheet.png', 'assets/sprites/anims/JSON_Hatman/sprites.json');
    this.load.atlasJSONHash('martian', 'assets/sprites/anims/JSON_Martian/spritesheet.png', 'assets/sprites/anims/JSON_Martian/sprites.json');
    // multiple animations character (controllable dude)
    this.load.atlasXML('character', 'assets/sprites/anims/XML_Character/char_anim.png', 'assets/sprites/anims/XML_Character/char_anim.xml');
    // dynamic animation: silver coin
    this.coin = this.load.image('coin', 'assets/sprites/coin.png');

    /** audio **/
    this.load.audio('step1', 'assets/audio/sfx/steps1.mp3');
    this.load.audio('step2', 'assets/audio/sfx/steps2.mp3');
    // All used audio keys to be able to wait for sound file decoding (see create)
    this.audioKeys = [ 'step1', 'step2'];

  },
  create: function ()
  {
    // Wait for mp3s to be decoded, if completed start game state
    this.sound.setDecodedCallback(this.audioKeys, () => {this.state.start('Game')}, this);
  },
  loadUpdate: function()
  {
    //console.log("Loading progress: " + this.load.progress + "%");
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  }
};
