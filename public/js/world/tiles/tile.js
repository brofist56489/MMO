var Tile = Class.extend({
	material: null,
	id: null,
	color: 0xffffff,

	init: function(id, textPath, color) {
		this.color = color || 0xffffff;
		this.id = id;
		this.material = new THREE.MeshBasicMaterial({ map: Cache.images[textPath], color: this.color, side: THREE.FrontSide });
	},
});

var TileHelper = {
	getById: function(id) {
		var retVal = null;
		_.forEach(TILES, function(t) {
			if(t.id == id) {
				retVal = t;
			}
		});
		return retVal;
	},
};

function setupTiles() {
	TILES = {
		"GRASS": new Tile(0, "/res/img/tiles/grass.png"),
		"STONE": new Tile(1, "/res/img/tiles/stone.png"),
	};

	TileHelper.Geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
}