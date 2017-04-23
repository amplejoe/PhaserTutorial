
Tutorial.Game = function (game)
{
  /* members */
  this.activeGroupIndex = 0;
  this.allGroups = [];
  this.selectKeys;
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
    logo.scale.setTo(0.4);

    // non mapped spritesheet
    let chestGroup = this.add.group();
    let x_coord = this.world.width*0.20;
    // creating sprites within in-world groups adds them to the world
    let chest_1 = chestGroup.create(x_coord, 10,'chests', 0); // 1st sprite
    let chest_2 = chestGroup.create(x_coord, 50,'chests', 4); // 5th sprite
    let chest_3 = chestGroup.create(x_coord, 90,'chests', 7); // 8th sprite
    this.allGroups.push(chestGroup);

    // mapped Spritesheets

    // XML
    let xmlGroup = this.add.group();
    x_coord = this.world.width*0.40;
    let nes_xml_1 = this.add.sprite(x_coord, 15,'nes_xml', 0); // 1st sprite
    xmlGroup.add(nes_xml_1); // sprites can also first be added to world, then to group
    let nes_xml_2 = this.add.sprite(x_coord, 75,'nes_xml', 1); // 2nd sprite
    xmlGroup.add(nes_xml_2);
    let nes_xml_3 = this.add.sprite(x_coord, 135,'nes_xml', 2); // 3rd sprite
    xmlGroup.add(nes_xml_3);
    this.allGroups.push(xmlGroup);

    // JSON Hash
    let jsonHashGroup = this.add.group();
    x_coord = this.world.width*0.60;
    // instead of numbers, also the mapped names can be used
    // (see assets/sprites/sheets/NES_Style_Tiles/JSONHash_spritesheetpacker/atlas.json)
    let nes_json_hash_1 = jsonHashGroup.create(x_coord, 15,'nes_json_hash', "NES_2_resized_04.png"); // 4th sprite
    let nes_json_hash_2 = jsonHashGroup.create(x_coord, 85,'nes_json_hash', "NES_2_resized_05.png"); // 5th sprite
    let nes_json_hash_3 = jsonHashGroup.create(x_coord, 155,'nes_json_hash', "NES_2_resized_06.png"); // 6th sprite
    this.allGroups.push(jsonHashGroup);

    // JSON Array
    let jsonArrayGroup = this.add.group();
    x_coord = this.world.width*0.80;
    let nes_json_array_1 = jsonArrayGroup.create(x_coord, 15,'nes_json_array', 6); // 7th sprite
    let nes_json_array_2 = jsonArrayGroup.create(x_coord, 85,'nes_json_array', 7); // 8th sprite
    let nes_json_array_3 = jsonArrayGroup.create(x_coord, 155,'nes_json_array', 0); // 1st sprite
    this.allGroups.push(jsonArrayGroup);

    // group selection keys
    this.selectKeys = this.input.keyboard.addKeys(
    {
      'one': Phaser.KeyCode.ONE,
      'two': Phaser.KeyCode.TWO,
      'three': Phaser.KeyCode.THREE,
      'four': Phaser.KeyCode.FOUR
    });
  },
  update: function ()
  {
    // Arrow keys are used to select active group
    if (this.selectKeys.one.isDown) this.activeGroupIndex = 0;
    if (this.selectKeys.two.isDown) this.activeGroupIndex = 1;
    if (this.selectKeys.three.isDown) this.activeGroupIndex = 2;
    if (this.selectKeys.four.isDown) this.activeGroupIndex = 3;
  },
  render: function ()
  {
    // Debug: highlights all members of currently selected group
    this.allGroups[this.activeGroupIndex].forEachAlive(
      (member) =>
      {
        // https://phaser.io/examples/v2/debug/debug-sprite
        this.game.debug.spriteBounds(member);
      }, this);
  }
};
