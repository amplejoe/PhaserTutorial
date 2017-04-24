
Tutorial.Game = function(game)
{
  /* members */

  // input
  this.cursors;

  // system font
  this.textSystem;
  this.textSystemColorIndex = 0;
  // downloaded font
  this.textDownloaded;
  // Web Font
  this.textWeb;
  // bitmap font
  this.bitmapFont;
  // font awesome
  this.fontAwesome;
  this.faBaseColor = Tutorial.CLBR_SET3_12[4];
  this.faHighlightColor = Tutorial.CLBR_SET3_12[6];
  this.num_fa_icons = 6;
  this.selectedIconIdx = 0;
};

Tutorial.Game.prototype =
{
  create: function ()
  {

    // [1] system fonts
    let color = Tutorial.CLBR_SET3_12[0];
    this.textSystem = this.add.text(this.world.centerX, this.world.height * 0.10,
      "System Font: click to change color\n(current: " + color + ")",
      {
        // style
        font: "32px Arial",
        fill: color,
        align: "center"
      });
    this.textSystem.anchor.setTo(0.5);
    this.textSystem.inputEnabled = true; // enable input events on text
    this.textSystem.events.onInputDown.add(this.updateColor, this); // set onclick function

    // [2] custom downloaded font from folder /assets/fonts (reference: see css/assets_text.css)
    // IMPORTANT: set font-family for body to this one and
    // add some dummy element (see 06_Assets_Text/index.html), else font wont show
    color = Tutorial.CLBR_SET3_12[1];
    this.textDownloaded = this.add.text(this.world.centerX, this.world.height * 0.30,
      "Downloaded Font: drag to move",
      {
        // style
        font: "32px Love Ya Like A Sister",
        fill: color,
        align: "center"
      });
    this.textDownloaded.anchor.setTo(0.5);
    this.textDownloaded.inputEnabled = true; // enable input events on text
    this.textDownloaded.input.enableDrag(); // allow dragging of font

    // [3] Google Web Font (needs to be preconfigured - see Load.js)
    this.textWeb = this.add.text(this.world.centerX, this.world.height * 0.50,
      " Google Web Font ", // adding whitespace to text prevents unwanted left/right cropping
      {
        // style
        font: "40px Sofia",
        align: "center",
        strokeThickness: 3
      });
    this.textWeb.anchor.setTo(0.5);
    let gradient = this.textWeb.context.createLinearGradient(0, 0, 0, this.textWeb.canvas.height);
    gradient.addColorStop(0, Tutorial.CLBR_SET3_12[2]);
    gradient.addColorStop(1, Tutorial.CLBR_SET3_12[3]);
    this.textWeb.fill = gradient;
    this.textWeb.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // [4] bitmap Font
    this.bitmapFont = this.add.bitmapText(this.world.centerX, this.world.height * 0.70, 'desyrel', 'Bitmap Font', 64);
    this.bitmapFont.anchor.setTo(0.5);

    // [5] Font Awesome (list of icon codes: http://fontawesome.io/cheatsheet/, change '&#x' to \u)
    this.fontAwesome = this.add.text(this.world.centerX, this.world.height * 0.90,
    'Font Awesome: \uf013 \uf15b \uf049 \uf04c \uf04b \uf050',
    {
      fill: this.faBaseColor,
      align: "center",
      font: '40px fontAwesome'
    });
    this.fontAwesome.anchor.setTo(0.5);
    // for changing icon colors on button press
    this.cursors = this.input.keyboard.createCursorKeys(); // [L,R,U,D] keys for selecting icons
    this.cursors.left.onDown.add(this.selectIcon,{state:this, direction:"prev"});
    this.cursors.right.onDown.add(this.selectIcon,{state:this, direction:"next"});
    this.colorIcon(this.selectedIconIdx, this.faHighlightColor); // highlight initial icon
  },
  // [1] color change for click on system fonts
  updateColor: function (object)
  {
    let newColor = Tutorial.CLBR_SET3_12[this.rnd.integerInRange(0, Tutorial.CLBR_SET3_12.length-1)];
    object.fill = newColor;
    object.text = "System Font: click to change color\n(current: " + newColor + ")";
  },
  // [5] Font Awesome icon selection
  selectIcon: function ()
  {
    // 'this' here are the passed arguments
    // (dictionary {state:xxx, direction:xxx}, see create function)
    let state = this.state;
    let direction = this.direction;
    let prevSelectedIconIdx = state.selectedIconIdx;

    if (direction == "prev")
    {
      state.selectedIconIdx--;
      if (state.selectedIconIdx < 0) state.selectedIconIdx = (state.num_fa_icons - 1);
    }
    else
    {
      state.selectedIconIdx++;
      state.selectedIconIdx %= state.num_fa_icons;
    }

    // unhighlight previous icon
    state.colorIcon(prevSelectedIconIdx, state.faBaseColor);
    // highlight new icon
    state.colorIcon(state.selectedIconIdx, state.faHighlightColor);

  },
  // [5] Font Awesome icon coloring
  colorIcon(idx, color)
  {
    // change color of single character
    let faText = this.fontAwesome.text;
    let allIconsIdx = this.getUnicodeCharIdx(faText); // all icon's positions in FA text as array
    let charIdx = allIconsIdx[idx]; // pick highlighting idx from allIconsIdx
    let prevColor = this.fontAwesome.style.fill; // save current color
    this.fontAwesome.addColor(color, charIdx); // new color starting from charIdx ()
    this.fontAwesome.addColor(prevColor, charIdx+1); // old color for letters after charIdx
  },
  // [5] Finds all unicode characters (= Font Awesom icons) in a string
  getUnicodeCharIdx(string)
  {
    let matches = [];
    for (let i = 0, n = string.length; i < n; i++) {
        if (string.charCodeAt( i ) > 255) { matches.push(i); }
    }
    return matches;
  },
  render: function ()
  {
    // debug text output
    this.game.debug.text("Highlight Font Awesome Icons with the [L,R] arrow keys.", 5, Tutorial.SCREEN_HEIGHT - 10);
  }
};
