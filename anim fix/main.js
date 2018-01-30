var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, animCells) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.totalTime = frameDuration * animCells.length;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.animCells = animCells
}

Animation.prototype.drawFrame2 = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = this.animCells[frame] % this.sheetWidth;
    yindex = Math.floor(this.animCells[frame] / this.sheetWidth);
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

function Ground(game, spritesheet, cx, cy) {
    this.x = 0;
    this.y = 0;
    // this.xindex = 0;
    // this.yindex = 0;
    // this.frameWidth = 128;
    // this.frameHeight = 128;
    // this.scale = 1;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    r = Math.floor(Math.random() * 2);
    this.animation = new Animation(spritesheet, 128, 128, 8, 1, 1, true, 1, [r]);
    this.speed = 100;
    Entity.call(this, game, cx, cy);
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

AM.queueDownload("./img/fullmoon.png");
AM.queueDownload("./img/iso_tiles.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/fullmoon.png")));
    for (j = 0; j < 5; j++) {    
        for (i = 4; i < 10; i++) {
            gameEngine.addEntity(new Ground(gameEngine, AM.getAsset("./img/iso_tiles.png"), 64 * i - 64 * j, 32 * i + 32 * j));
        }
    }

    console.log("All Done!");
});