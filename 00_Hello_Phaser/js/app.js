window.onload = function()
{
    // Phaser.AUTO: automatically switch between Phaser.WEBGL and Phaser.CANVAS renderer mode,
    // depending on browser support - can be omitted as it is the default option
    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

    function preload ()
    {
        game.load.image('logo', 'assets/sprites/phaser.png');
    }

    function create ()
    {
        let logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
};
