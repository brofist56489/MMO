var TileMap = Class.extend({
	width: -1,
	height: -1,
	tiles: null,

	view_distance_x: 15,
	view_distance_y: 10,

	init: function(w, h) {
		this.width = w;
		this.height = h;

		this._initTileArray();
	},

	_initTileArray: function() {
		this.tiles = [];
		for(var y=0, ym=this.height; y < ym; y++) {
			for(var x=0, xm=this.width; x < xm; x++) {
				this.tiles.push(new MappedTile(Math.floor(Math.random() * 2), x, y));	
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

	tick: function() {
	},

	render: function() {
		var trans = Render.getTranslation();
		var cx = Math.floor(trans.x / TileHelper.SIZE);
		var cy = Math.floor(trans.y / TileHelper.SIZE);

		var y, x, tile;
		for(y=cy-this.view_distance_y; y<=cy+this.view_distance_y; y++) {
			for(x=cx-this.view_distance_x; x<=cx+this.view_distance_x; x++) {
				tile = this.getTile(x, y);
				if(tile) tile.render();
			}
		}
		// for(y=0; y<this.height; y++) {
		// 	for(x=0; x<this.width; x++) {
		// 		this.getTile(x, y).render();
		// 	}
		// }
	},
});



var MappedTile = Class.extend({
	baseTile: null,
	id: null,

	//World space coords
	world_x: -1,
	world_y: -1,

	//Grid coords
	map_x: -1,
	map_y: -1,

	init: function(id, x, y) {
		this.id = id;
		this.world_x = x * TileHelper.SIZE;
		this.world_y = y * TileHelper.SIZE;
		this.map_x = x;
		this.map_y = y;

		this.baseTile = TileHelper.getById(id);
	},

	changeType: function(tile) {
		this.baseTile = tile;
		this.id = tile.id;
	},

	render: function() {
		Render.drawImageSimple(this.baseTile.image, this.world_x, this.world_y);
	},
});