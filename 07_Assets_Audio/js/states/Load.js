Tutorial.Load = function(game)
{
  // label for displaying loading information
  this.loadingLabel;
  // keys for audio objects
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

    // music
    let music = this.load.audio('music', 'assets/audio/music/oedipus_wizball_highscore.mp3');

    // sfx
    let explosion = this.load.audio('explosion', 'assets/audio/sfx/explosion.mp3');
    let laser = this.load.audio('laser', 'assets/audio/sfx/lazer_wall_off.mp3');
    let ping = this.load.audio('ping', 'assets/audio/sfx/p-ping.mp3');

    // All used keys to be able to wait for sound file decoding (see create)
    // INFO: here we use 'load' to add audio to the Phaser Cache,
    // therefore we need to pass cache keys to to setDecodedCallback,
    // as opposed to the actual audio objects when using 'add' (see e.g. https://phaser.io/examples/v2/audio/loop)
    this.audioKeys = [ 'music', 'explosion', 'laser', 'ping' ];

  },
  create: function()
  {
    // Wait for encoded files to be decoded, if completed start game state (onDecoded)
    // IMPORTANT: this cannot be done in preload, since it relies on this.audioKeys
    // existing in the Phaser.Cache, which can only be assured now
    this.sound.setDecodedCallback(this.audioKeys, this.onDecoded, this);

  },
  loadUpdate: function()
  {
    this.loadingLabel.text = 'loading - ' + this.load.progress + '%';
  },
  onDecoded: function()
  {
    // start next state
    this.state.start('Game');
  },

};
