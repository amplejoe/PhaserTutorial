// constructor
Tutorial.PhaserDude = function (game, x, y, rotateSpeed)
{
  // super constructor
  Phaser.Sprite.call(this, game, x, y, 'dude');
  this.anchor.setTo(0.5, 0.5);
  // members
  this.rotateSpeed = rotateSpeed;
};

// create sprite
Tutorial.PhaserDude.prototype = Object.create(Phaser.Sprite.prototype);

// set constructor
Tutorial.PhaserDude.prototype.constructor = Tutorial.PhaserDude;
// methods
Tutorial.PhaserDude.prototype.update = function()
{
    this.angle += this.rotateSpeed;
};
