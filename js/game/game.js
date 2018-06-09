var CrazyCandy = CrazyCandy || {};
CrazyCandy.Game = function () { };
CrazyCandy.Game.prototype = {
    velocity: 5,
    gravity: 1000,
    velocityY: 500,
    enemyRate: 1,
    enemyRateChangeTimer: 0,
    timerCheck: 0,
    score: 0,
    preload: function () { },
    create: function () {

        this.game.physics.setBoundsToWorld();
        this.score = 0;

        //Add scrolling background image tile.
        this.backgroundTile = this.add.tileSprite(0, 0, 800, 600, 'background');
        this.backgroundTile.tileScale.setTo(0.6)

        //Add candy
        this.candy = this.add.sprite(100, this.game.world.centerY, 'candy');
        this.candy.anchor.setTo(0.5);

        // this.animation = this.game.add.tween(this.candy);
        // this.animation.to({ angle: -180 }, 100);


        // Lollipops.
        this.pop = this.add.sprite(200, 200, 'pop');
        this.pop.anchor.setTo(0.5);
        this.pop.scale.setTo(0.2);

        //Add physics to candy
        this.game.physics.arcade.enable(this.candy);
        this.candy.body.allowGravity = true;
        this.candy.body.gravity.y = this.gravity;
        this.candy.checkWorldBounds = true;
        this.candy.events.onOutOfBounds.add(function () {
            this.gameOver();
        }, this);

        //Add Score section here
        this.scoreText = this.add.text(this.game.world.width - 150, 10, 'Score: 0', {
            font: '24px Roboto',
            fill: '#000',
            fontWeight: 'bold'
        });

        //Add collision listeners
        this.game.input.onTap.add(function () {
            this.candy.body.velocity.y = this.velocityY * -1;
            // this.animation.stop();
            // this.animation.start();
        }, this);
    },
    update: function () {
        this.backgroundTile.tilePosition.x -= this.velocity;
        if (this.candy.body.velocity.y >= 0) {
            this.candy.angle += 5;
        }else{
            this.candy.angle -= 5;
        }
    },
    gameOver: function () {
        this.game.state.start('game-over');
    },
    updateScore: function () {
        this.scoreText.setText('Score: ' + this.score);
    }
};