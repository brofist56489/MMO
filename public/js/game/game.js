var Game = Class.extend({
    world: null,
    running: true,
    renderer: null,
    
    stats: null,
    
    init: function() {
        GAME = this;

        this.renderer = new Render.CanvasRenderer(854, 480);
        Render.renderer = this.renderer;
        $("#webgl-container").append(this.renderer.domElement);

        // this.world = new World();
        new GameUpdater(this).start();
    },
    
    tick: function() {
        // this.world.tick();

        MouseJS.update();
    },
    
    render: function() {
        // this.world.render();
        Render.fill("#5f5f5f");
        _.times(1500, function(i) {
            Render.drawRect((i % 300) * 2, Math.floor(i / 300) * 100, 100, 100, "#"+((i * 16).toString(16)), true);
        });
        // Render.drawCircle(100, 100, 50, "red", true);
        Render.finalizeRender();
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