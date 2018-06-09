var CrazyCandy = CrazyCandy || {};
CrazyCandy.GameOver = function () { }
CrazyCandy.GameOver.prototype = {
    preload: function () { },
    create: function () {

        this.background = this.add.sprite(0, 0, 'background');
        // this.background.scale.setTo(0.6);        
        
        // Game-over text imgage
        this.gameOver = this.add.sprite(109, 71, 'game-over');
        this.gameOver.scale.setTo(0.5);

        // Replay button
        this.replay = this.add.sprite(140, 139, 'replay');
        this.replay.scale.setTo(0.5);

        this.replay.inputEnabled = true;
        this.replay.events.onInputDown.add(function () {
            this.game.state.start('game')
        }, this);

    },
    update: function () {
    }
}