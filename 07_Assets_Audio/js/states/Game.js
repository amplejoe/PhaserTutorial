
Tutorial.Game = function (game)
{
  /* members */
  this.keyControls;
  this.music;
  this.sfx;
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

    // Key Controls

    // define tutorial keyboard controls
    this.selectKeys = this.input.keyboard.addKeys(
    {
      'm': Phaser.KeyCode.M,
      'p': Phaser.KeyCode.P,
      'one': Phaser.KeyCode.ONE,
      'two': Phaser.KeyCode.TWO,
      'three': Phaser.KeyCode.THREE
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
    this.game.debug.text( "Use [1-"+Object.keys(this.sfx).length+"] keys to play different SFX.", 5, Tutorial.SCREEN_HEIGHT - 10 );
  }
};
