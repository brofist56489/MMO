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
        // Render.fill("#5f5f5f");
        Render.drawRect(0, 0, 100, 100, "red", true);
        Render.drawRect(0, 100, 100, 100, "blue", true);
        Render.drawRect(100, 100, 100, 100, "green", true);
        Render.drawRect(100, 0, 100, 100, "yellow", true);
        Render.drawCircle(100, 100, 10, "white", true);
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