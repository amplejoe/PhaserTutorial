
Tutorial.Game = function (game)
{
  /* members */
};

Tutorial.Game.prototype =
{
  create: function ()
  {
    // GameObjectCreator (make)
    let creatorLogo = this.make.sprite(0,0,'logo'); // create sprite
    creatorLogo.scale.setTo(0.5);
    this.world.add(creatorLogo); // add sprite to world (= root group)

    // GameObjectFactory (add)
    let factoryLogo = this.add.sprite(this.world.width, 0, 'logo'); // create and add sprite to world
    factoryLogo.scale.setTo(0.5);
    factoryLogo.anchor.setTo(1.0,0)

    // create and add custom sprite to world
    let numDudes = 5;
    for (let i=0;i<numDudes;i++)
    {
      let dude = new Tutorial.PhaserDude(this, this.world.randomX, this.world.randomY, Math.random());
      this.add.existing(dude);
    }
  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Press [F5] to reload and rearrange Phaser Dudes.", 5, Tutorial.SCREEN_HEIGHT - 10);
  }
};
