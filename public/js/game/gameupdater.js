var GameUpdater = Class.extend({
    lt: 0,
    now: 0,
    delta: 0,
    mspt: 0,
    game: null,

    // frames: 0,
    // ticks: 0,
    // ltr: 0,
    
    init: function(game) {
        this.game = game;
        this.lt = Date.now();
        this.now = this.lt;
        // this.ltr = this.lt;
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
            // this.ticks++;
        }
        
        this.game.render();
        // this.frames++;

        // if(this.now - this.ltr >= 1000.0) {
        //     this.ltr += 1000.0;
        //     console.log(this.ticks, this.frames);
        //     this.ticks = 0;
        //     this.frames = 0;
        // }
        
        if(this.game.running)
            window.requestAnimationFrame(function(time) {
                GameUpdater.pointer.update(time);
            });
    },
});