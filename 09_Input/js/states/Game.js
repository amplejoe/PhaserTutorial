
Tutorial.Game = function (game)
{
  /* members */
};

Tutorial.Game.prototype =
{
  create: function ()
  {


  },
  render: function()
  {

    // mouse debug info
    this.game.debug.inputInfo(32, 32);

    // debug text output
    this.game.debug.text( "Debug Text.", 5, Tutorial.SCREEN_HEIGHT - 10 );

  }
};
