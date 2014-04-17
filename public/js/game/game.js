var i = 0.1;
var Game = Class.extend({
    world: null,
    running: true,
    renderer: null,
    
    stats: null,
    
    init: function() {
        GAME = this;

        this.renderer = new Render.CanvasRenderer(854, 480);
        Render.renderer = this.renderer;
        this.renderer.setScale(2, 2);
        this.renderer.updateMatrix();

        $("#webgl-container").css("opacity", "0");
        $("#webgl-container").append(this.renderer.domElement);
        $("#webgl-container").animate({ opacity: 1 }, 3000);

        $("#loading-info-center").animate({ opacity: 0 }, 3000, function() { $(this).remove(); });
         
        $(".info-window").draggable();
        $(".close-window-button").hover(function() {
            $(this).css("background-color", "#ff0000");
        }, function() {
            $(this).css("background-color", "#ffffff");
        });

        $(".close-window-button").click(function() {
            $(this).parent().remove();
        });

        $(".info-window").css("position", "absolute");

        this.world = new World();
        new GameUpdater(this).start();
    },
    
    tick: function() {
        this.world.tick();
        
        MouseJS.update();
    },
    
    render: function() {
        Render.fill("#5f5f5f");
        this.world.render();
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