var Class = Class || {};

var Game = Class.extend({
    world: null,
    running: true,
    
    init: function() {
        this.world = new World();
        new GameUpdater(this).start();
    },
    
    tick: function() {
        this.world.tick();
    },
    
    render: function() {
        this.world.render();
    },
});

function loadAllAssets() {
    new ScriptLoader().loadFiles(function() {
        console.log("All scripts loaded");
        images = new ImageLoader();
        images.loadFiles(function() {
            console.log("All images loaded");
            setTimeout(function() {
               new Game();
            }, 1000); 
        });
    });
}

function main() {
    loadAllAssets();
}

window.onload = main;