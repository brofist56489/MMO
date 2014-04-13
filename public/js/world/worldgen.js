var WorldGenerator = Class.extend({
	heightMap: null,
	width: -1,
	height: -1,
	seed: -1,
	plane: null,
	planeGeo: null,

    init: function(w, h, seed) {
		this.width = w;
		this.height = h;
		this.seed = seed || Math.random() * 100;
    },

    _genHeightMap: function() {
    	this.heightMap = NoiseMap.ValueNoise(this.width, this.height, 2, 7, 0.3, 100, this.seed);
    },

    _genWorld: function() {
    	this.planeGeo = new THREE.PlaneGeometry(256, 256, this.width, this.height);
        console.log(this.planeGeo);
    	for(var i=0; i<this.planeGeo.vertices.length; i++) {
    		this.planeGeo.vertices[i].z = this.heightMap[i] * 25;
    	}
        this.planeGeo.computeVertexNormals();
        this.planeGeo.computeFaceNormals();
        this.planeGeo.computeMorphNormals();
    },

    /**
    * @param three {ThreeHandler} the ThreeHandler used in world.
    * @return {Mesh} the plane mesh after generation.
    */
    generate: function(three) {
    	this._genHeightMap();
        this._genWorld();
    	this.plane = new THREE.Mesh(this.planeGeo, TILES.GRASS.material);
        this.plane.rotation.x = -Math.PI / 2;
    	return this.plane;
    },
});