
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
    let logo = this.add.sprite(0, 0, 'logo');

    // non mapped spritesheet
    let chest_1 = this.add.sprite(this.world.centerX, 10,'chests', 0); // 1st sprite
    let chest_2 = this.add.sprite(this.world.centerX, 50,'chests', 4); // 5th sprite
    let chest_3 = this.add.sprite(this.world.centerX, 90,'chests', 7); // 8th sprite


    // TODO: named sprite -> frame = number|string - for maps?
    //let chest_2 = this.add.sprite(20, 40,'chests', "name"); // nam sprite


    //this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');

  },
  update: function ()
  {

  }
};
