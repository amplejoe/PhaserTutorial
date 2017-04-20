window.onload = function()
{

    /** GLOBALS */

    // game variable
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    // various
    let player;
    let platforms;
    let cursors;
    let jumpButton;

    function preload ()
    {
        game.load.image('player', 'assets/sprites/phaser-dude.png');
        game.load.image('platform', 'assets/sprites/platform.png');
    }

    function create ()
    {
      player = game.add.sprite(100, 200, 'player');

      game.physics.arcade.enable(player);

      player.body.collideWorldBounds = true;
      player.body.gravity.y = 500;

      platforms = game.add.physicsGroup();

      platforms.create(500, 150, 'platform');
      platforms.create(-200, 300, 'platform');
      platforms.create(400, 450, 'platform');

      platforms.setAll('body.immovable', true);

      cursors = game.input.keyboard.createCursorKeys();
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    function update ()
    {
      game.physics.arcade.collide(player, platforms);

      player.body.velocity.x = 0;

      if (cursors.left.isDown)
      {
          player.body.velocity.x = -250;
      }
      else if (cursors.right.isDown)
      {
          player.body.velocity.x = 250;
      }

      if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
      {
          player.body.velocity.y = -400;
      }
    }
};
