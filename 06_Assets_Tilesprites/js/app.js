window.onload = function()
{
    // game variable
    Tutorial.phasergame = new Phaser.Game(Tutorial.SCREEN_WIDTH, Tutorial.SCREEN_HEIGHT);

    // add states
    Tutorial.phasergame.state.add('Boot', Tutorial.Boot);
    Tutorial.phasergame.state.add('Load', Tutorial.Load);
    Tutorial.phasergame.state.add('Title', Tutorial.Title);
    Tutorial.phasergame.state.add('Game', Tutorial.Game);
    Tutorial.phasergame.state.add('Game2', Tutorial.Game2);
    Tutorial.phasergame.state.add('Game3', Tutorial.Game3);

    // start Title state
    Tutorial.phasergame.state.start('Boot');
};
