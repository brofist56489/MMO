var World = Class.extend({
    three: null,
    controls: null,
    
    init: function() {
        this.three = new ThreeHandler();
        this.three.setup();

        this.controls = new CameraControl(this.three.camera);

        this.addToScene(new WorldGenerator(16, 16, 69).generate(this.three));
        // var t = new THREE.Mesh(genCone(50, 50, 8), new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false }));
        // t.position.z = -60;
        // this.addToScene(t);

        this.three.camera.rotation.x = -Math.PI / 3;
        this.three.camera.position.y = 80;
        
        var light = new THREE.PointLight(0xffffff);
        light.position.set(200, 200, 200);
        this.addToScene(light);
    },
    
    addToScene: function(o) {
        console.log(o);
        this.three.scene.add(o);
    },
    
    tick: function() {
        this.controls.update();
    },
    
    render: function() {
        this.three.render();  
    },
});
