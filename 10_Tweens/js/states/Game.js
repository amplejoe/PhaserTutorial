
Tutorial.Game = function (game)
{
  /* members */
  this.keys;

  this.birds = [];
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    let bg = this.add.sprite(0,0,'bg');
    bg.width = this.world.width;
    bg.height = this.world.height;

    this.keys = this.input.keyboard.addKeys(
      {
        launch: Phaser.KeyCode.SPACEBAR
      }
    );
    this.keys.launch.onDown.add(
      () =>
      {
        let bird = this.add.sprite(this.world.randomX, this.world.randomY, 'bird');
        bird.anchor.setTo(0.5);
        bird.animations.add('fly');
        bird.animations.play('fly', 5, true);
        bird.inputEnabled = true; // enable click events on bird

        bird.events.onInputDown.add(
        () =>
        {
          //TODO kill bird with tween
          console.log("bird clicked");
        }, this);


        this.birds.push(bird);

      },this);

  },
  render: function()
  {
    // debug text output
    this.game.debug.text( "Pres [SPACE] to launch bird, click to shoot it.", 5, Tutorial.SCREEN_HEIGHT - 10 );
  }
};
