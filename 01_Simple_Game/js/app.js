window.onload = function()
{
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    let logo;

    function preload ()
    {
        game.load.image('logo', 'assets/sprites/phaser.png');
    }

    function create ()
    {
        logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

    function update ()
    {
      logo.rotation += 0.01;
    }
};
