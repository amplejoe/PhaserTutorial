
Tutorial.Game = function(game)
{
  /* members */

  // system font
  this.textSystem;
  this.textSystemColorIndex = 0;

  // downloaded font
  this.textDownloaded;

  // Web Font
  this.textWeb;

  // bitmap font
  this.bitmapFont;
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    // [1] system fonts
    let color = Tutorial.CLBR_SET3_12[0];
    this.textSystem = this.add.text(this.world.centerX, this.world.height * 0.15,
      "System Font: click to change color\n(current: " + color + ")",
      {
        // style
        font: "32px Arial",
        fill: color,
        align: "center"
      });
    this.textSystem.anchor.setTo(0.5, 0.5);
    this.textSystem.inputEnabled = true; // enable input events on text
    this.textSystem.events.onInputDown.add(this.updateColor, this);

    // [2] custom downloaded font from folder /assets/fonts (reference: see css/assets_text.css)
    // IMPORTANT: set font-family for body to this one and
    // add some dummy element (see 06_Assets_Text/index.html), else font wont show
    color = Tutorial.CLBR_SET3_12[1];
    this.textDownloaded = this.add.text(this.world.centerX, this.world.height * 0.35,
      "Downloaded Font: drag to move",
      {
        // style
        font: "32px Love Ya Like A Sister",
        fill: color,
        align: "center"
      });
    this.textDownloaded.anchor.setTo(0.5, 0.5);
    this.textDownloaded.inputEnabled = true; // enable input events on text
    this.textDownloaded.input.enableDrag(); // allow dragging of font

    // [3] Google Web Font (needs to be preconfigured - see Load.js)
    this.textWeb = this.add.text(this.world.centerX, this.world.height * 0.55,
      "Google Web Font",
      {
        // style
        font: "40px Sofia",
        align: "center",
        strokeThickness: 3
      });
    this.textWeb.anchor.setTo(0.5, 0.5);
    let gradient = this.textWeb.context.createLinearGradient(0, 0, 0, this.textWeb.canvas.height);
    gradient.addColorStop(0, Tutorial.CLBR_SET3_12[2]);
    gradient.addColorStop(1, Tutorial.CLBR_SET3_12[3]);
    this.textWeb.fill = gradient;
    this.textWeb.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // [4] bitmap Font
    this.bitmapFont = this.add.bitmapText(this.world.centerX, this.world.height * 0.75, 'desyrel', 'Bitmap Font', 64);
    this.bitmapFont.anchor.setTo(0.5, 0.5);

  },
  updateColor: function (object)
  {
    let newColor = Tutorial.CLBR_SET3_12[this.rnd.integerInRange(0, Tutorial.CLBR_SET3_12.length-1)];
    object.fill = newColor;
    object.text = "System Font: click to change color\n(current: " + newColor + ")";
  }
};
