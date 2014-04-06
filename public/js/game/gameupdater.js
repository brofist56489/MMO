var GameUpdater = Class.extend({
    lt: 0,
    now: 0,
    delta: 0,
    mspt: 0,
    game: null,
    
    init: function(game) {
        this.game = game;
        this.lt = Date.now();
        this.now = this.lt;
        this.mspt = 60.0 / 1000.0;
        GameUpdater.pointer = this;
    },
    
    start: function() {
        window.requestAnimationFrame(function(time) {
            GameUpdater.pointer.update(time);
        });
    },
    
    update: function(time) {
        this.now = Date.now();
        this.delta += (this.now - this.lt) * this.mspt;
        this.lt = this.now;
        
        while(this.delta >= 1) {
            this.game.tick();
            this.delta--;
        }
        
        this.game.render();
        
        if(this.game.running)
            window.requestAnimationFrame(function(time) {
                GameUpdater.pointer.update(time);
            });
    },
});