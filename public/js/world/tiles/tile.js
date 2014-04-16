var Tile = Class.extend({
	image: null,
	id: null,
	color: 0xffffff,

	init: function(id, textPath, color) {
		this.color = color || 0xffffff;
		this.id = id;

		this.image = Cache.images["/res/img/tiles/" + textPath];
	},
});

var TileHelper = {
	// Store constants up here
	SIZE: 16,

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
		"GRASS": new Tile(0, "grass.png"),
		"STONE": new Tile(1, "stone.png"),
	};
}