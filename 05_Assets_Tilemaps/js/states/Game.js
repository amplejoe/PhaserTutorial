
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

    let map;
    let layer;

    if (Tutorial.TILEMAP_TYPE == "JSON")
    {
      // JSON tilemap

      //  add tilemap to game
      map = this.add.tilemap('desert_level');

      // set tileset image
      //  1st parameter: tileset name, as specified in the Tiled map editor (see assets/sprites/tilemap/desert_level.json)
      //  2nd parameter: image used for the tileset (from Phaser.Cache)
      map.addTilesetImage('desert_tiles', 'tiles');

      //  Create a layer from Level1 layer in map data (see assets/sprites/tilemap/desert_level.json)
      //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
      layer = map.createLayer('Level1');

    }
    else
    {
      // csv tilemap

      //  For CSV map data the tile size needs to specified to be able to render it (here 32)
      map = this.add.tilemap('desert_level', 32, 32);
      //  Now add in the tileset
      map.addTilesetImage('tiles');
      //  Create layer
      layer = map.createLayer(0);
    }

    // resize the game world to match layer dimensions (only if world is smaller than tilemap)
    layer.resizeWorld();

    // debug for checking world bounds
    this.DebugRect = new Phaser.Rectangle( 0, 0, this.world.width, this.world.height );
    this.toggleDebugButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.toggleDebugButton.onDown.add(
      (key) =>
      {
        this.showDebug = !this.showDebug;
      }, this);

  },
  render: function()
  {
    if (this.showDebug)
      this.game.debug.geom(this.DebugRect, 'rgba(255,0,0,0.5)');
    else
      this.game.debug.geom(this.DebugRect, 'rgba(255,0,0,0.0)');
  }
};
