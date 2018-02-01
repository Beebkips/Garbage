var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.totalTime = frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    // this.animCells = animCells
}

Animation.prototype.drawFrame2 = function (tick, ctx, x, y, cells) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = cells[frame] % this.sheetWidth;
    yindex = Math.floor(cells[frame] / this.sheetWidth);
    // console.log(this.animCells[frame] + " " + xindex + " " + yindex)

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
    // console.log(xindex * this.frameWidth, yindex * this.frameHeight)
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
    // console.log(xindex * this.frameWidth, yindex * this.frameHeight)
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

function Ground(game, spritesheet, x, y, view) {
    this.x = x;
    this.y = y;
    this.view = view;
    // this.xindex = 0;
    // this.yindex = 0;
    // this.frameWidth = 128;
    // this.frameHeight = 128;
    // this.scale = 1;
    this.scale = .75
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    r = Math.floor(Math.random() * 4);
    this.animation = new Animation(this.spritesheet, 128, 128, 8, 1, 1, true, this.scale, [r]);
    this.speed = 100;
    cx = 64 * this.x - 64 * this.y + 384;
    cy = 32 * this.x + 32 * this.y;
    Entity.call(this, game, cx * this.scale, cy * this.scale);
}

Ground.prototype = new Entity();
Ground.prototype.constructor = Ground;

Ground.prototype.update = function () {
};

Ground.prototype.draw = function () {
    if (this.removeFromWorld !== true) {
        this.animation.drawFrame2(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
};

function inView (Ground) {
    console.log("Here" + this.view)
    if (Ground.x > this.view[0] && Ground.x < this.view[2] && Ground.y > this.view[1] && Ground.y < this.view[3]) {
        console.log("In view: " + Ground.x, Ground.y)
        return true
    }
    return false
}

// Camera.prototype = new Entity();
// Camera.prototype.constructor = Camera;

function Camera (game, w, h, spritesheet) {
    this.game = game;
    this.ctx = game.ctx;
    this.view = [0, 0, 11, 11];
    this.x = 6;
    this.y = 6;
    this.cx = 100;
    this.cy = 100;
    this.ground = new Array(h);
    this.spritesheet = spritesheet;
    this.scale = 1;
    this.lastTick = 0;
    this.totalTime = 0;

    for (i = 0; i < h; i++) {
        this.ground[i] = new Array(w);
    }
    for (i = 0; i < h; i++) {
        for (j = 0; j < w; j++) {
            this.ground[i][j] = Math.floor(Math.random() * 4);
        }
    }

    this.animation = new Animation(spritesheet, 128, 128, 8, 1, 1, true, this.scale);
}

Camera.prototype.update = function () {
    this.totalTime += this.game.clockTick
    if (this.totalTime - this.lastTick > 1) {
        this.view = [this.view[0] + 1, this.view[1] + 1, this.view[2] + 1, this.view[3] + 1]
        this.lastTick = this.totalTime;
    }
}

Camera.prototype.draw = function () {
        // console.log(this.view)
        // console.log(this.ground)
    for (i = this.view[0]; i < this.view[2]; i++) {
        for (j = this.view[1]; j < this.view[3]; j++) {
            this.animation.drawFrame2(this.game.clockTick, this.ctx, 
                64 * (i - this.view[0]) - 64 * (j - this.view[1]) + 384, 
                32 * (i - this.view[0]) + 32 * (j - this.view[1]), 
                [this.ground[i][j]]);
            // Entity.prototype.draw.call(this);
            // this.ctx.drawImage(this.spritesheet, this.x, this.y);
            // this.ctx.drawImage(this.game.clockTick, this.ctx, this.cx, this.cy, [this.ground[i][j]]);
        }
    }
}

AM.queueDownload("./img/fullmoon.png");
AM.queueDownload("./img/iso_tiles.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/fullmoon.png")));
    Camera = new Camera(gameEngine, 25, 25, AM.getAsset("./img/iso_tiles.png"))
    gameEngine.addEntity(Camera);
    // for (j = 0; j < 25; j++) {    
    //     for (i = 0; i < 25; i++) {
    //         gameEngine.addEntity(new Ground(gameEngine, AM.getAsset("./img/iso_tiles.png"), i, j, Camera.view));
    //     }
    // }

    console.log("All Done!");
});