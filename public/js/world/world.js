var World = Class.extend({
    three: null,
    cube: null,
    cubes: [],
    
    init: function() {
        this.three = new ThreeHandler();
        this.three.setup();
        
        this.cube = new THREE.Mesh(
            new THREE.CubeGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false })
        );
        
        //this.addToScene(this.cube);
        
        this.genCubes();
        
        this.three.camera.position.z = 200;
        
        var light = new THREE.PointLight(0xffffff);
        light.position.set(50, 50, 150);
        this.addToScene(light);
    },
    
    genCubes: function() {
        for(var i=0; i<250; i++) {
            var cube = new THREE.Mesh(
                new THREE.CubeGeometry(20, 20, 20),
                new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false })
            );
            cube.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
            this.cubes.push(cube);
            this.addToScene(cube);
        }  
    },
    
    addToScene: function(o) {
        this.three.scene.add(o);
    },
    
    tick: function() {
        var amm = (2*Math.PI/300);
        this.cube.rotation.y += amm;
        // this.cube.rotation.x += 0.04;
        // this.cube.rotation.z += 0.07;
        _.forEach(this.cubes, function(cube) {
            cube.rotation.y += amm; 
        });
    },
    
    render: function() {
        this.three.render();  
    },
});