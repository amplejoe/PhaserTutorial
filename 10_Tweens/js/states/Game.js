
Tutorial.Game = function (game)
{
  /* members */
  this.keys;

  this.crows = []; // for crow dictionaries ({sprite,tweens})

  // score text
  this.ScoreText;
  this.score = 0;
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    // background
    let bg = this.add.sprite(0,0,'bg');
    bg.width = this.world.width;
    bg.height = this.world.height;

    // score (fixed to camera)
    let scorePos = {x: this.world.width - 150, y:  32};
    this.ScoreText = this.add.text(scorePos.x, scorePos.y, "Score: " + this.score, { font: "32px Arial", fill: "#000000", align: "left" });

    // keyboard input
    this.keys = this.input.keyboard.addKeys(
      {
        launch: Phaser.KeyCode.SPACEBAR
      }
    );
    this.keys.launch.onDown.add(
      () =>
      {
        // randomly spawn crow offscreen
        let coin = this.rnd.integerInRange(0, 1);
        let xSide = (coin < 1) ? -1 : 1;
        coin = this.rnd.integerInRange(0, 1);
        let ySide = (coin < 1) ? -1 : 1;
        let xCoord = this.world.centerX + (xSide * (this.world.width/2+100));
        let yCoord = this.world.centerY + (ySide * (this.world.height/2+100));

        // create crow
        let crow = this.add.sprite(xCoord, yCoord, 'crow');
        crow.anchor.setTo(0.5);
        crow.animations.add('fly');
        crow.animations.play('fly', 10, true);
        crow.inputEnabled = true; // enable click events on crow

        let dictEntry = {sprite: crow, tweens: []};
        this.addFlyTweens(dictEntry);

        // kill crow with clicks
        crow.events.onInputDown.add(
        () =>
        {
          // stop and remove all tweens
          for (let i= 0;i<dictEntry.tweens.length;i++)
          {
            dictEntry.tweens[i].stop();
            // remove tween from game
            // IMPORTANT: not possible via sprite - always keep a reference
            this.tweens.remove(dictEntry.tweens[i]);
          }

          // create new tweens for dying
          this.addDieTweens(dictEntry);

          // update score display
          this.score++;
          this.ScoreText.text = "Score: " + this.score;
        }, this);

        // save crow in array for future reference (destroying etc.)
        this.crows.push(dictEntry);

      },this);

  },
  addFlyTweens: function(entry)
  {
    // random settings for tweens
    let offScreenDistance = 500;
    let flySpeed = this.rnd.integerInRange(2000, 6000);
    let flyDestX = this.world.centerX < entry.sprite.x ? 0-offScreenDistance : this.world.width + offScreenDistance;
    let flyDestY = this.world.centerY < entry.sprite.y ? 0-offScreenDistance : this.world.height + offScreenDistance;

    // flip sprite depending on flying destination
    if (flyDestX < 0) entry.sprite.scale.x *= -1;

    // create new movement tween {properties}, duration, easing function, autostart, delay, repeat_number, yoyo (play back and forth)
    let tweenFly = this.game.add.tween(entry.sprite).to({ x: flyDestX, y: flyDestY}, flySpeed, Phaser.Easing.Linear.None, true);
    entry.tweens.push(tweenFly);

  },
  addDieTweens: function(entry)
  {
    let tweenDuration = this.rnd.integerInRange(300, 1000);
    // create new rotation tween {properties}, duration, easing function, autostart, delay, repeat_number, yoyo (play back and forth)
    let tweenRotate = this.game.add.tween(entry.sprite).to({ angle: -360}, tweenDuration, Phaser.Easing.Linear.None, true, 0, 1000);
    // fly offscreen in random direction
    let offScreenDistance = 500;
    let flySpeed = this.rnd.integerInRange(1000, 4000);
    let rndPos = {x: this.world.randomX, y: this.world.randomY};
    let flyDestX = rndPos.x < this.world.centerX ? 0 - offScreenDistance : this.world.width + offScreenDistance;
    let flyDestY = rndPos.y < this.world.centerY ? 0 - offScreenDistance :  this.world.height + offScreenDistance;
    let tweenFly = this.game.add.tween(entry.sprite).to({ x: flyDestX, y: flyDestY}, flySpeed, Phaser.Easing.Linear.None, true);
    // alpha tween + red tint
    let alphaTween = this.game.add.tween(entry.sprite).to( { alpha: 0.6, tint: 0xff0000 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);

    // add tween to dictionary
    entry.tweens.push(tweenRotate);
    entry.tweens.push(tweenFly);
    entry.tweens.push(alphaTween);

    // remove tweens on completion
    tweenFly.onComplete.add(
      () =>
      {
        // remove all tweens
        for (let i=0;i<entry.tweens.length;i++)
          this.tweens.remove(entry.tweens[i]);
        // finally destroy crow
        let index = this.crows.indexOf(entry);
        if (index > -1) this.crows.splice(index, 1);
        entry.sprite.destroy();
        entry.tweens = [];
        console.log("Crow died at position: " + entry.sprite.x +"," + entry.sprite.y);
      }, this);

  },
  render: function()
  {
    // debug text output
    this.game.debug.text( "Pres [SPACE] to launch crow, click to shoot it.", 5, Tutorial.SCREEN_HEIGHT - 10 );
  }
};
