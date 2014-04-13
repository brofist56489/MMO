var Class = Class || {};

var Game = Class.extend({
    world: null,
    running: true,
    three: null,
    
    init: function() {
        GAME = this;

        this.three = new ThreeHandler();
        this.three.setup();
        this.world = new World();
        new GameUpdater(this).start();
    },
    
    tick: function() {
        this.world.tick();

        MouseJS.update();
    },
    
    render: function() {
        this.world.render();
        GAME.three.render();
    },
});

function loadAllAssets() {
    new ScriptLoader().loadFiles(function() {
        console.log("All scripts loaded");
        images = new ImageLoader();
        images.loadFiles(function() {
            console.log("All images loaded");
            
            prepareForRun();
            setTimeout(function() {
                new Game();
            }, 1);
        });
    });
}

function main() {
    loadAllAssets();
}

window.onload = main;