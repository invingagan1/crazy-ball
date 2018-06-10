var CrazyCandy = CrazyCandy || {};
CrazyCandy.Game = function () { };
CrazyCandy.Game.prototype = {
    velocity: 5,
    gravity: 400,
    velocityY: 200,
    enemyRate: 1,
    enemyRateChangeTimer: 0,
    timerCheck: 0,
    score: 0,
    preload: function () { },
    create: function () {

        this.game.physics.setBoundsToWorld();
        this.score = 0;

        //Add scrolling background image tile.
        this.backgroundTile = this.add.tileSprite(0, 0, 400, 312, 'background');
        // this.backgroundTile.tileScale.setTo(0.5)

        //Add helicopter
        this.helicopter = this.add.sprite(50, this.game.world.centerY, 'helicopter');
        this.helicopter.anchor.setTo(0.5);
        this.helicopterAnimation = this.helicopter.animations.add('fly');
        this.helicopter.animations.play('fly', 60, true);


        // Lollipops.
        this.pops = this.game.add.group();


        this.addRowOfPops();

        this.timer = this.game.time.events.loop(1500, function () {
            this.addRowOfPops();
            this.score++;
            this.updateScore();
        }, this);

        // this.pop = this.add.sprite(200, 200, 'pop');
        // this.pop.anchor.setTo(0.5);
        // this.pop.scale.setTo(0.2);

        //Add physics to helicopter
        this.game.physics.arcade.enable(this.helicopter);
        this.helicopter.body.allowGravity = true;
        this.helicopter.body.gravity.y = this.gravity;
        this.helicopter.checkWorldBounds = true;
        this.helicopter.events.onOutOfBounds.add(function () {
            this.gameOver();
        }, this);

        //Add Score section here
        this.scoreText = this.add.text(this.game.world.width - 150, 10, 'Score: 0', {
            font: '24px Roboto',
            fill: '#000',
            fontWeight: 'bold'
        });

        //Add collision listeners

        // Add input listeners
        this.game.input.onDown.add(function () {
            this.helicopter.body.velocity.y = this.velocityY * -1;
            this.helicopter.body.gravity.y = 0;
        }, this);
        this.game.input.onUp.add(function() {
            this.helicopter.body.velocity.y = 0;
            this.helicopter.body.gravity.y = this.gravity;
        }, this)
    },
    update: function () {
        this.backgroundTile.tilePosition.x -= 0.5;

        this.game.physics.arcade.overlap(
            this.helicopter, this.pops, function () {
                this.game.state.start('game-over');
            }, null, this
        )
    },
    gameOver: function () {
        this.game.state.start('game-over');
    },
    updateScore: function () {
        this.scoreText.setText('Score: ' + this.score);
    },
    addPop: function (x, y) {
        var pop = this.game.add.sprite(x, y, 'crate');
        this.pops.add(pop);
        this.game.physics.arcade.enable(pop);
        // pop.scale.setTo(0.2);
        pop.body.velocity.x = -200;
        pop.checkWorldBounds = true;
        pop.ouOfBoundsKill = true;
    },
    addRowOfPops: function () {
        var holePosition = Math.floor(Math.random() * 10) + 1;

        // Add the 13 pipes 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 14; i++) {
            if (i != holePosition &&
                i != holePosition + 1 &&
                i != holePosition + 2 &&
                i != holePosition + 3 &&
                i != holePosition + 4) {
                this.addPop(400, i * 24);
            }
        }
    }
};