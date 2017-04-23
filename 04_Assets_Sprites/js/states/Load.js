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
    //progressBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(progressBar); // automatically scales progress bar

    /* assets */

    // simple image
    this.load.image('logo', 'assets/sprites/phaser.png');

    // atlas, no mapping file (MUST exacly know tile sizes - here 32x32)
    this.load.spritesheet('chests', 'assets/sprites/sheets/Chests/chests_32x32.png', 32, 32);

    // Spritesheets with accompanying map files -
    // for utilized tools & copyright information see extras/tools folder

    // XML mapped atlas, created with ShoeBox (XML should be in UTF-8)
    this.load.atlasXML('nes_xml', 'assets/sprites/sheets/NES_Style_Tiles/XML_shoebox/sprites.png',
      'assets/sprites/sheets/NES_Style_Tiles/XML_shoebox/sprites.xml');

    // JSON Hash mapped atlas, created with Sprite Sheet Packer & user JSON Hash extension
    this.load.atlasJSONHash('nes_json_hash', 'assets/sprites/sheets/NES_Style_Tiles/JSONHash_spritesheetpacker/atlas.png',
      'assets/sprites/sheets/NES_Style_Tiles/JSONHash_spritesheetpacker/atlas.json');

    //JSON Array mapped atlas, created with Leshy SpriteSheet Tool
    this.load.atlasJSONArray('nes_json_array', 'assets/sprites/sheets/NES_Style_Tiles/JSONArray_leshysstool/spritesheet.png',
      'assets/sprites/sheets/NES_Style_Tiles/JSONArray_leshysstool/sprites.json');

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
