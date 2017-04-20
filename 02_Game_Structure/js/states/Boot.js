Tutorial.Boot = function(game){};

Tutorial.Boot.prototype =
{
  preload: function()
  {
    this.load.image('progressBar', 'assets/sprites/progressbar.png');
  },
  create: function()
  {
    /** phaser settings **/
    this.stage.backgroundColor = '#525252';
    // use arcade physics engine
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // ensure sprites are rendered at integer positions:
    // sprites rendered at non-integer (sub-pixel) positions appear blurry,
    // as canvas tries to anti-alias them between the two pixels.
    // IMPORTANT: has to be set globally via 'this.game'
    this.game.renderer.renderSession.roundPixels = true;

    // start Load state
    this.state.start('Load');
  }
};
