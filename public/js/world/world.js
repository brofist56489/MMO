var World = Class.extend({
    controls: null,
    tileMap: null,
    
    init: function() {
        var three = GAME.three;

        this.tileMap = new TileMap(10, 10);
        this.tileMap.addToScene(this);

        this.controls = new CameraControl(three.camera);
        three.camera.position.z = 1;
        
        var light = new THREE.PointLight(0xffffff);
        light.position.set(200, 200, 200);
        this.addToScene(light);
    },
    
    addToScene: function(o) {
        console.log(o);
        GAME.three.scene.add(o);
    },
    
    tick: function() {
        this.controls.update();
    },
    
    render: function() {
    },
});
