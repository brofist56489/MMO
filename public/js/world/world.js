var World = Class.extend({
    controls: null,
    tileMap: null,
    
    init: function() {
        this.controls = new CameraControl(GAME.renderer);
        this.tileMap = new TileMap(50, 50);
    },
    
    tick: function() {
        this.controls.update();
    },
    
    render: function() {
        this.tileMap.render();
    },
});
