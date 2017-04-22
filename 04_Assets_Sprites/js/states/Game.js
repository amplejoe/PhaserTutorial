
Tutorial.Game = function (game)
{
  /* members */

};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // accessing loaded assets via the cache
    // useful e.g. for getting dimensions
    console.log("Phaser logo width: " + this.cache.getImage('logo').width);

    // adding assets

    // plain picture
    this.logo = this.add.sprite(0, 0, 'logo');

    //this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');

  },
  update: function ()
  {

  }
};
