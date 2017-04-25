
Tutorial.Game = function (game)
{
  /* members */
  this.keyControls;
  this.music;
  this.NUM_SFX = 9;
  this.sfx;
  this.audioSprite;
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    // FA music logo (cheatsheet: http://fontawesome.io/cheatsheet/)
    let logo = this.add.text(this.world.centerX, this.world.centerY,
    '\uf001 \uf001 \uf001',
    {
      fill: '#fb8072',
      align: "center",
      font: '80px Font Awesome'
    });
    logo.anchor.setTo(0.5);

    // music (volume 1.0, loop: true)
    this.music = this.add.audio('music', 1.0, true);
    this.music.play();

    // sfx
    this.sfx =
    {
      explosion: this.add.audio('explosion'),
      laser: this.add.audio('laser'),
      ping: this.add.audio('ping'),
    };

    // audio sprite
    this.audioSprite = this.add.audioSprite('audio_sprite');
    this.audioSprite.allowMultiple = true;

    // Key Controls

    // define tutorial keyboard controls
    this.selectKeys = this.input.keyboard.addKeys(
    {
      'm': Phaser.KeyCode.M,
      'p': Phaser.KeyCode.P,
      'one': Phaser.KeyCode.ONE,
      'two': Phaser.KeyCode.TWO,
      'three': Phaser.KeyCode.THREE,
      'four': Phaser.KeyCode.FOUR,
      'five': Phaser.KeyCode.FIVE,
      'six': Phaser.KeyCode.SIX,
      'seven': Phaser.KeyCode.SEVEN,
      'eight': Phaser.KeyCode.EIGHT,
      'nine': Phaser.KeyCode.NINE,
    });

    // start / stop music
    this.selectKeys.m.onDown.add(
      () =>
      {
        if (this.music.isPlaying) this.music.stop();
        else this.music.play();
      }, this);
    // pause / resume music
    this.selectKeys.p.onDown.add(
      () =>
      {
        if (this.music.isPlaying) this.music.pause();
        else this.music.resume();
      }, this);
    this.selectKeys.one.onDown.add(() => {this.sfx.explosion.play()}, this);
    this.selectKeys.two.onDown.add(() => {this.sfx.laser.play()}, this);
    this.selectKeys.three.onDown.add(() => {this.sfx.ping.play()}, this);

    // see assets/audio/sfx/audio_sprite/fx_mixdown.json for keys
    this.selectKeys.four.onDown.add(() => {this.audioSprite.play('alien death')}, this);
    this.selectKeys.five.onDown.add(() => {this.audioSprite.play('numkey')}, this);
    this.selectKeys.six.onDown.add(() => {this.audioSprite.play('meow')}, this);
    this.selectKeys.seven.onDown.add(() => {this.audioSprite.play('squit')}, this);
    this.selectKeys.eight.onDown.add(() => {this.audioSprite.play('death')}, this);
    this.selectKeys.nine.onDown.add(() => {this.audioSprite.play('shot')}, this);

  },
  render: function()
  {
    // debug text output
    let musicStatus = this.music.isPlaying ? "PLAYING" : this.music.paused ? "PAUSED" : "STOPPED";
    let musicTxt1 = (musicStatus == "PLAYING") ? "stop" : "start";
    let musicTxt2 = "";
    if (musicStatus != "STOPPED")
    {
      // music is either paused or playing
      let txt = (musicStatus == "PAUSED") ? "resume" : "pause";
      musicTxt2 = ", [P] to "+txt+"";
    }
    this.game.debug.text( "Music "+musicStatus+": Press [M] to "+musicTxt1+" music"+musicTxt2+".", 5, Tutorial.SCREEN_HEIGHT - 30 );
    this.game.debug.text( "Use [1-"+this.NUM_SFX+"] keys to play different SFX.", 5, Tutorial.SCREEN_HEIGHT - 10 );
  }
};
