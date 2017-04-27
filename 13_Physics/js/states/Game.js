
Tutorial.Game = function (game)
{
  /* members */
  this.showBounds=false;
  this.activePhysicsSystem = Tutorial.PHYSICS_NONE;

  // custom bottom bounds
  this.lowerWorldBoundY;
  this.lowerWorldLine;
  this.customBottomBoundArcade;
  this.customBottomBoundP2;

  // groups
  this.bgGroup;
  this.characterGroup;
  this.environmentGroup;
  this.debugGroup;

  this.alien;

  this.buttons;
};

Tutorial.Game.prototype =
{
  preload: function ()
  {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.startSystem(Phaser.Physics.P2JS);

  },
  // changes active physics
  changePhysics: function(physicsKey)
  {
    // destroy all bodies if existing
    this.characterGroup.forEachAlive(
      (member) =>  { if (member.body !== null) member.body.destroy();}, this);
    this.environmentGroup.forEachAlive(
      (member) => {if (member.body !== null) member.body.destroy();}, this);

    // change physics systems
    switch (physicsKey)
    {
      case Tutorial.PHYSICS_NONE:
      break;
      case Tutorial.PHYSICS_ARCADE:
        this.characterGroup.forEachAlive(
          (member) =>
          {
            this.game.physics.arcade.enable(member);
            member.body.collideWorldBounds = true;
            member.body.gravity.y = 500;
            member.body.bounce.y = 0.60;
            member.body.bounce.x = 0.60;
            member.body.enable = true;
            // random velocity
            member.body.velocity.y = this.rnd.integerInRange(-500, 500);
            member.body.velocity.x = this.rnd.integerInRange(-500, 500);
          }, this);
          this.environmentGroup.forEachAlive(
            (member) =>
            {
              this.game.physics.arcade.enable(member);
              // member.body.immovable = true;
              member.body.enable = true;
              member.body.collideWorldBounds = true;
            }, this);
        break;
      case Tutorial.PHYSICS_P2:
        this.game.physics.p2.gravity.y = 500;
        this.characterGroup.forEachAlive(
          (member) =>
          {
            this.game.physics.p2.enable(member);
            member.body.setCircle(35);
            // member.body.velocity.y = 500;
            member.body.collideWorldBounds = true;
            member.body.enable = true;
            // random velocity
            member.body.velocity.y = this.rnd.integerInRange(-500, 500);
            member.body.velocity.x = this.rnd.integerInRange(-500, 500);
          }, this);
          this.environmentGroup.forEachAlive(
          (member) =>
          {
            this.game.physics.p2.enable(member);
            member.body.collideWorldBounds = true;
            // member.body.static = true; // can not be moved
            member.body.enable = true;
          }, this);
      default:
        break;
    }

  },
  create: function ()
  {
    // groups
    this.bgGroup = this.add.group();
    this.environmentGroup = this.add.group();
    this.characterGroup = this.add.group();
    this.debugGroups = [this.characterGroup,this.environmentGroup];

    //this.world.bounds.setTo(0, 0, this.world.width, this.world.height/2);

    this.createLowerWorldBound();

    // background
    let bg = this.bgGroup.create(0, 0,'bg');
    bg.width = this.world.width;
    bg.height = this.world.height;

    // ball
    let char = this.characterGroup.create(this.world.centerX, 50, 'aliens', "alienYellow_round.png");
    char.anchor.setTo(0.5);


    // stone
    let stone = this.environmentGroup.create(this.world.centerX, this.lowerWorldBoundY, 'stones', "elementStone015.png");
    stone.anchor.setTo(0.5,1.0);


    // buttons
    this.buttons = this.input.keyboard.addKeys(
      {
        one: Phaser.KeyCode.ONE,
        two: Phaser.KeyCode.TWO,
        three: Phaser.KeyCode.THREE,
        debug: Phaser.KeyCode.D
      }
    );
    this.buttons.debug.onDown.add(() => {this.showBounds = !this.showBounds}, this);
    // physics switch buttons
    this.buttons.one.onDown.add(() => {this.activePhysicsSystem = Tutorial.PHYSICS_NONE; this.changePhysics(this.activePhysicsSystem);}, this);
    this.buttons.two.onDown.add(() => {this.activePhysicsSystem = Tutorial.PHYSICS_ARCADE; this.changePhysics(this.activePhysicsSystem);}, this);
    this.buttons.three.onDown.add(() => {this.activePhysicsSystem = Tutorial.PHYSICS_P2; this.changePhysics(this.activePhysicsSystem);}, this);

    // switch to initial physics system
    this.changePhysics(this.activePhysicsSystem);


  },
  update: function()
  {
    this.game.physics.arcade.collide(this.characterGroup, this.environmentGroup);

    // collide with lower world bounds
    this.game.physics.arcade.collide(this.environmentGroup, this.customBottomBoundArcade);
    this.game.physics.arcade.collide(this.characterGroup, this.customBottomBoundArcade);
  },
  // creates lower world bound for physics systems (high than bottom of screen)
  createLowerWorldBound: function()
  {
    // P2 physics bottom (http://phaser.io/examples/v2/p2-physics/collide-custom-bounds)
    var sim = this.game.physics.p2;
    this.lowerWorldBoundY = this.world.centerY + 150;
    this.customBottomBoundP2 = new p2.Body({ mass: 0, position: [ sim.pxmi(0), sim.pxmi(this.lowerWorldBoundY) ] });
    this.customBottomBoundP2.addShape(new p2.Plane());
    sim.world.addBody(this.customBottomBoundP2);


    // arcade physics invisible wall (http://www.html5gamedevs.com/topic/6194-invisible-walls/)
    this.customBottomBoundArcade = this.add.sprite(0, this.lowerWorldBoundY);
    this.game.physics.arcade.enable(this.customBottomBoundArcade);
    this.customBottomBoundArcade.body.width = this.world.width;
    this.customBottomBoundArcade.body.immovable = true;
    this.customBottomBoundArcade.collideWorldBounds = true;
    this.customBottomBoundArcade.allowGravity = false;

  },
  showBoundingBoxes: function()
  {
    // Debug: highlights all members of all groups
    for (let i = 0; i < this.debugGroups.length; i++)
    {
      this.debugGroups[i].forEachAlive(
        (member) =>
        {
          switch (this.activePhysicsSystem)
          {
            case Tutorial.PHYSICS_NONE:
              // debug sprites only (https://phaser.io/examples/v2/debug/debug-sprite)
              this.game.debug.spriteBounds(member);
              break;
            case Tutorial.PHYSICS_ARCADE:
              // debug arcade physics bodies (https://phaser.io/examples/v2/arcade-physics/body-debug)
              this.game.debug.body(member);
              break;
            case Tutorial.PHYSICS_P2:
              // debug p2 physics bodies (https://phaser.io/examples/v2/p2-physics/world-boundary)
              //this.game.physics.p2.enable(member, true);
              member.body.debug = true;
            default:
              break;
          }
        }, this);
    }

    // draw debug line for lower world bounds
    if (!this.lowerWorldLine)
    {
      // p2 physics
      this.lowerWorldLine = this.add.graphics(0, 0);
      this.lowerWorldLine.lineStyle(3, 0x33FF00); // set a fill and line style
      this.lowerWorldLine.moveTo(0, this.lowerWorldBoundY);
      this.lowerWorldLine.lineTo(this.world.width, this.lowerWorldBoundY);
      // arcade physics
      this.customBottomBoundArcade.body.debug = true;
    }
  },
  render: function()
  {

    // debug text output
    let activePhysicsText;
    switch (this.activePhysicsSystem)
    {
      case Tutorial.PHYSICS_NONE:
        activePhysicsText = "None";
        break;
      case Tutorial.PHYSICS_ARCADE:
        activePhysicsText = "Arcade";
        break;
      case Tutorial.PHYSICS_P2:
        activePhysicsText = "P2";
      default:
        break;
    }
    this.game.debug.text("Press [1,2,3] to change Physics Systems - active: " + activePhysicsText, 5, Tutorial.SCREEN_HEIGHT - 30);
    this.game.debug.text("Press [D] to toggle bounding boxes.", 5, Tutorial.SCREEN_HEIGHT - 10);

    // bouding boxes

    if (!this.showBounds)
    {
      // cleanup

      // remove world lower bound line
      if (this.lowerWorldLine)
      {
        this.lowerWorldLine.destroy();
        this.lowerWorldLine = null;
      }

      // turn off debug for p2 phyiscs
      if (this.activePhysicsSystem === Tutorial.PHYSICS_P2)
      for (let i = 0; i < this.debugGroups.length; i++)
        this.debugGroups[i].forEachAlive((member) => {member.body.debug = false;}, this);

      return;
    }

    this.showBoundingBoxes();
  }



};
