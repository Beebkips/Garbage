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

// 0    0
// 486  0
// 972  0
// 1458 0
// 0    431
// 486  431

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
    console.log(xindex * this.frameWidth, yindex * this.frameHeight)
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
    console.log(xindex * this.frameWidth, yindex * this.frameHeight)
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

//green
function Green(game, spritesheet) {
    this.animation = new Animation(spritesheet, 53, 44, 4, 0.2, 5, true, 0.5, [3, 7, 11, 15, 19]);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Green.prototype = new Entity();
Green.prototype.constructor = Green;

Green.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
    if (this.x > 500) {
      this.x = 0;
    }
}

Green.prototype.draw = function () {
    if (this.removeFromWorld !== true) {
      this.animation.drawFrame2(this.game.clockTick, this.ctx, this.x, this.y);
      Entity.prototype.draw.call(this);
    }
}

AM.queueDownload("./img/fullmoon.png");
AM.queueDownload("./img/ufo.png");
AM.queueDownload("./img/spritesheet.png");
AM.queueDownload("./img/shootsheet.png");
AM.queueDownload("./img/blueshoot.png");
AM.queueDownload("./img/bluewalk.png");
AM.queueDownload("./img/greendead.png");
AM.queueDownload("./img/greenlay.png");
AM.queueDownload("./img/neptune.png");
AM.queueDownload("./img/jupiter.png");
AM.queueDownload("./img/blue stand.png");

AM.queueDownload("./img/megaman7.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/fullmoon.png")));
    gameEngine.addEntity(new Green(gameEngine, AM.getAsset("./img/megaman7.png")));
    // gameEngine.addEntity(new Blue(gameEngine, AM.getAsset("./img/bluewalk.png")));
    // gameEngine.addEntity(new GreenShoot(gameEngine, AM.getAsset("./img/shootsheet.png")));
    // gameEngine.addEntity(new GreenDead(gameEngine, AM.getAsset("./img/greendead.png")));
    // gameEngine.addEntity(new GreenLay(gameEngine, AM.getAsset("./img/greenlay.png")));
    // gameEngine.addEntity(new BlueShoot(gameEngine, AM.getAsset("./img/blueshoot.png")));
    // gameEngine.addEntity(new Neptune(gameEngine, AM.getAsset("./img/neptune.png")));
    // gameEngine.addEntity(new Jupiter(gameEngine, AM.getAsset("./img/jupiter.png")));
    // gameEngine.addEntity(new BlueStand(gameEngine, AM.getAsset("./img/blue stand.png")));
    // gameEngine.addEntity(new Ufo(gameEngine, AM.getAsset("./img/ufo.png")));

    console.log("All Done!");
});


// //ufo
// function Ufo(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 1250, 502, 1, 0.2, 1, true, 0.5);
//     this.speed = 70;
//     this.ctx = game.ctx;
//     Entity.call(this, game, -500, -500);
//     this.removeFromWorld = false;
// }

// Ufo.prototype = new Entity();
// Ufo.prototype.constructor = Ufo;

// Ufo.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     this.y += 1;
//     if (this.x > 200) {
//       this.speed = 1;
//       this.y -= 1;
//       if (this.x > 205) {
//         this.speed = 100;
//         this.y -= 1;
//       }
//     }
//     Entity.prototype.update.call(this);
// }

// Ufo.prototype.draw = function () {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
// }

// //neptune
// function Neptune(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 200, 200, 1, 0.2, 1, true, 0.5);
//     this.speed = 50;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 250);
// }

// Neptune.prototype = new Entity();
// Neptune.prototype.constructor = Neptune;

// Neptune.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Neptune.prototype.draw = function () {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
// }

// //jupiter
// function Jupiter(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 300, 300, 1, 0.2, 1, true, 0.5);
//     this.speed = 75;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 100, 100);
// }

// Jupiter.prototype = new Entity();
// Jupiter.prototype.constructor = Jupiter;

// Jupiter.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Jupiter.prototype.draw = function () {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
// }

// //green
// function Green(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 4, 0.2, 6, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
// }

// Green.prototype = new Entity();
// Green.prototype.constructor = Green;

// Green.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     Entity.prototype.update.call(this);
//     if (this.x > 175) {
//       this.removeFromWorld = true;
//     }
// }

// Green.prototype.draw = function () {
//     if (this.removeFromWorld !== true) {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
//     }
// }

// //green shoot
// function GreenShoot(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 4, 0.2, 11, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
//     this.removeFromWorld = true;
// }

// GreenShoot.prototype = new Entity();
// GreenShoot.prototype.constructor = GreenShoot;

// GreenShoot.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//      if (this.x > 175) {
//        this.removeFromWorld = false;
//        this.speed = 5;
//        if (this.x > 210.105) {
//          this.removeFromWorld = true;
//          this.speed = 0;
//          this.x = 100;
//        }
//      }
//     Entity.prototype.update.call(this);
// }

// GreenShoot.prototype.draw = function () {
//     if (this.removeFromWorld !== true) {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
//     }
// }

// //green dead
// function GreenDead(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 4, 0.2, 11, true, 0.5);
//     this.speed = 23.9;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
//     this.removeFromWorld = true;
// }

// GreenDead.prototype = new Entity();
// GreenDead.prototype.constructor = GreenDead;

// GreenDead.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//      if (this.x > 204.5) {
//        this.removeFromWorld = false;
//        this.speed = 0;
//        this.y += 0.64;
//        if (this.y > 515) {
//          this.removeFromWorld = true;
//          this.x = 100;
//        }
//      }
//     Entity.prototype.update.call(this);
// }

// GreenDead.prototype.draw = function () {
//     if (this.removeFromWorld !== true) {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
//     }
// }

// //green lay
// function GreenLay(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 1, 0.2, 1, true, 0.5);
//     this.speed = 25.5;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 450);
//     this.removeFromWorld = true;
// }

// GreenLay.prototype = new Entity();
// GreenLay.prototype.constructor = GreenLay;

// GreenLay.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//      if (this.x > 207.5) {
//        this.speed = 0;
//        this.y += 0.5;
//        if (this.y > 513.3) {
//          this.removeFromWorld = false;
//          this.y -= 0.5;
//        }
//      }
//     Entity.prototype.update.call(this);
// }

// GreenLay.prototype.draw = function () {
//     if (this.removeFromWorld !== true) {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
//     }
// }

// //blue
// function Blue(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 4, 0.2, 6, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 600, 450);
// }

// Blue.prototype = new Entity();
// Blue.prototype.constructor = Blue;

// Blue.prototype.update = function () {
//     this.x -= this.game.clockTick * this.speed;
//     if (this.x < 425) {
//       this.removeFromWorld = true;
//       this.speed = 5;
//     }
//     Entity.prototype.update.call(this);
// }

// Blue.prototype.draw = function () {
//   if (this.removeFromWorld !== true) {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
//   }
// }

// //blue shoot
// function BlueShoot(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 4, 0.2, 11, true, 0.5);
//     this.speed = 100;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 600, 450);
//     this.removeFromWorld = true;
// }

// BlueShoot.prototype = new Entity();
// BlueShoot.prototype.constructor = BlueShoot;

// BlueShoot.prototype.update = function () {
//     this.x -= this.game.clockTick * this.speed;
//      if (this.x < 425) {
//        this.removeFromWorld = false;
//        this.speed = 5;
//        if (this.x < 381) {
//          this.removeFromWorld = true;
//          this.speed = 0;
//          this.x = 100;
//        }
//      }
//     Entity.prototype.update.call(this);
// }

// BlueShoot.prototype.draw = function () {
//     if (this.removeFromWorld !== true) {
//       this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//       Entity.prototype.draw.call(this);
//     }
// }

// //blue stand
// function BlueStand(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 486, 431, 1, 0.2, 1, true, 0.5);
//     this.speed = 14.5;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 600, 450);
//     this.removeFromWorld = true;
// }

// BlueStand.prototype = new Entity();
// BlueStand.prototype.constructor = BlueStand;

// BlueStand.prototype.update = function () {
//     this.x -= this.game.clockTick * this.speed;
//     if (this.x < 450) {
//       this.removeFromWorld = false;
//       this.speed = 0;
//       this.y -= 3;
//       if (this.y < 100) {
//         this.removeFromWorld = true;
//       }
//     }
//     Entity.prototype.update.call(this);
// }

// BlueStand.prototype.draw = function () {
//   if (this.removeFromWorld !== true) {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
//   }
// }