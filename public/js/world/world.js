var World = Class.extend({
    three: null,
    triangle: null,
    
    init: function() {
        this.three = new ThreeHandler();
        this.three.setup();

        this.triangle = new THREE.Mesh(
            this.genCone(50, 100, 8),
            new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false, side: THREE.FrontSide })
        );

        this.addToScene(this.triangle);
        
        this.three.camera.position.z = 200;
        
        var light = new THREE.PointLight(0xffffff);
        light.position.set(0, 0, 500);
        this.addToScene(light);
    },
    
    addToScene: function(o) {
        this.three.scene.add(o);
    },

    genCone: function(r, h, p) {
        var geom = new THREE.Geometry();

        var h2 = h / 2;
        var topVert = new THREE.Vector3(0, h2, 0);
        var bottomVert = new THREE.Vector3(0, -h2, 0);

        var presicion = p || 100;
        var step = 2 * Math.PI / presicion;
        var circVerts = [];
        for(var i=0, j=2*Math.PI; i < j; i += step) {
            circVerts.push(new THREE.Vector3(Math.cos(i) * r, -h2, Math.sin(i) * r));
        }

        geom.vertices.push(topVert);
        geom.vertices.push(bottomVert);

        for(var i=0, j=presicion; i < j; i++) {
            geom.vertices.push(circVerts[i]);
        }

        for(var i=2, j=presicion+1; i <= j; i++) {
            var k = (i === presicion+1) ? 2 : i+1;
            geom.faces.push(new THREE.Face3(i, 0, k));
            geom.faces.push(new THREE.Face3(k, 1, i));
        }

        geom.computeFaceNormals();

        return geom;
    },
    
    tick: function() {
    },
    
    render: function() {
        this.three.render();  
    },
});
