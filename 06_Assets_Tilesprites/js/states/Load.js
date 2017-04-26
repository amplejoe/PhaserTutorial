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

    // buttons to switch between game states Game and Game2
    let switchbuttons = this.input.keyboard.addKeys({'one': Phaser.KeyCode.ONE, 'two': Phaser.KeyCode.TWO, 'three': Phaser.KeyCode.THREE});
    switchbuttons.one.onDown.add(() => { this.state.start('Game');}, this); // function added to 'onDown' stay across states unless removed
    switchbuttons.two.onDown.add(() => { this.state.start('Game2');}, this);
    switchbuttons.three.onDown.add(() => { this.state.start('Game3');}, this);
    this.game.input.resetLocked = true; //IMPORTANT: Needed to enable [1,2] on every state, else input gets reset on state change

    // assets

    // scene 1
    // texture image starfield
    let tileSprite = this.load.image('tex_starfield', 'assets/textures/starfield.jpg');
    let outline = this.load.image('tex_starfield_outline', 'assets/textures/starfield_outline.png'); // outline for showing texture borders

    // scene 2
    // texture image lava
    tileSprite = this.load.image('tex_lava', 'assets/textures/Lava_4_resized.png');
    // cave sprite
    let sprite = this.load.image('cave', 'assets/sprites/cave_no_bg_800x600.png');

    // scene 3: parallax scrolling
    // background layers
    this.load.image('bg_z-2', 'assets/sprites/z-2.png');
    this.load.image('bg_z-1', 'assets/sprites/z-1.png');
    this.load.image('bg_z0', 'assets/sprites/z0.png');

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
