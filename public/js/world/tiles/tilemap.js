var TileMap = Class.extend({
	width: -1,
	height: -1,
	tiles: null,

	init: function(w, h) {
		this.width = w;
		this.height = h;

		this._initTileArray();
	},

	_initTileArray: function() {
		this.tiles = [];
		for(var y=0, ym=this.height; y < ym; y++) {
			for(var x=0, xm=this.width; x < xm; x++) {
				this.tiles.push(new MappedTile((x + y) % 2, x, y));	
			}
		}
	},

	_updateTileType: function(x, y, tile) {
		this.tiles[x + y * this.width].changeType(tile);
	},

	getTile: function(x, y) {
		if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return null;
		}

		return this.tiles[x + y * this.width];
	},

	setTile: function(x, y, tile) {
		if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
			return;
		}

		this._updateTileType(x, y, tile);
	},

	addToScene: function(world) {
		// var three = GAME.three;
		_.forEach(this.tiles, function(tile) {
			world.addToScene(tile.mesh);
		});
	},
});



var MappedTile = Class.extend({
	mesh: null,
	id: null,
	x: -1,
	y: -1,

	init: function(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;

		this.mesh = new THREE.Mesh(TileHelper.Geometry, TileHelper.getById(id).material);
		this.mesh.position.set(x * 50, y * 50, 0);
	},

	changeType: function(tile) {
		this.mesh.material = tile.material;
		this.id = tile.id;
	},
});