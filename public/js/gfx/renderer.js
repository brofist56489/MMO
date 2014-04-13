var Render = {
	get renderer () {
		return this._renderer;
	},

	set renderer (val) {
		val.initialize();
		this._renderer = val;
	}
};

/**
 * A base render class.
 * @param {Number} w
 * @param {Number} h
 */
Render.Renderer = function(w, h) {
	this.domElement = null;

	this.width = w;
	this.height = h;

	this.initialize = function() {
	};

	/**
	 * Changes size of render target
	 * @param {Number} w
	 * @param {Number} h
	 */
	this.setSize = function(w, h) {
	};

	this._finalizeRender = function() {
	};

	
	this._fill = function(color) {
	};

	this._drawRect = function(x, y, w, h, color) {
	};

	this._fillRect = function(x, y, w, h, color) {
	};

	this._drawCircle = function(x, y, r, color) {
	};

	this._fillCircle = function(x, y, r, color) {
	};
};

/**
* @param w {Number} width of screen
* @param h {Number} height of screen
*/
Render.CanvasRenderer = function(w, h) {
	Render.Renderer.call(this, w, h);

	var dbCanvas = document.createElement('canvas');
	var ctx = dbCanvas.getContext("2d");

	var renderCtx = null;

	this.initialize = function() {
		this.domElement = document.createElement('canvas');

		this.setSize(this.width, this.height);

		// ctx = dbCanvas.getContext("2d");
		ctx = this.domElement.getContext('2d');
	};

	this.setSize = function(w, h) {
		this.width = w;
		this.height = h;
		this.domElement.width = w;
		this.domElement.height = h;
		dbCanvas.width = w;
		dbCanvas.height = h;
	};

	this._finalizeRender = function() {
		// renderCtx.drawImage(dbCanvas, 0, 0);
	};

	this._fill = function(color) {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, this.width, this.height);
	};

	this._fillRect = function(x, y, w, h, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	};

	this._drawRect = function(x, y, w, h, color) {
		ctx.strokeStyle = color;
		ctx.strokeRect(x, y, w, h);
	};

	this._fillCircle = function(x, y, r, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	};

	this._drawCircle = function(x, y, r, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
	};
};


/**
 * Draws a rectangle on screen
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} w
 * @param  {Number} h
 * @param  {String} color
 * @param  {Bool} filled
 */
Render.drawRect = function(x, y, w, h, color, filled) {
	if(filled)
		Render._renderer._fillRect(x, y, w, h, color);
	else
		Render._renderer._drawRect(x, y, w, h, color);
};

/**
 * Draws a circle on the screen
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} r
 * @param  {String} color
 * @param  {Bool} filled
 */
Render.drawCircle = function(x, y, r, color, filled) {
	if(filled)
		Render._renderer._fillCircle(x, y, r, color);
	else
		Render._renderer._drawCircle(x, y, r, color);
};

/**
 * Fills the entire screen with [color].
 * @param  {String} color
 */
Render.fill = function(color) {
	Render._renderer._fill(color);
};

/**
 * Finalizes the rendering process
 */
Render.finalizeRender = function() {
	Render._renderer._finalizeRender();
};