var World = Class.extend({
    controls: null,
    tileMap: null,
    
    init: function() {
        this.tileMap = new TileMap(10, 10);
        this.tileMap.addToScene(this);
    },
    
    tick: function() {
        this.controls.update();
    },
    
    render: function() {
        this.tileMap.render();
    },
});
