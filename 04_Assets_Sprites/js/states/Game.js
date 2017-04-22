
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
    console.log(this.cache.getImage('logo').width);

    // adding assets
    this.logo = this.add.sprite(0, 0, 'logo');
  },
  update: function ()
  {

  }
};
