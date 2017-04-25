
Tutorial.Game = function (game)
{
  /* members */
  this.showDebug=false;
  this.toggleDebugButton;
  this.DebugRect;
};

Tutorial.Game.prototype =
{
  create: function ()
  {



  },
  render: function()
  {

    // debug text output
    this.game.debug.text( "Change scrolling direction with [L,R,U,D] arrow keys.", 5, Tutorial.SCREEN_HEIGHT - 10 );

  }
};
