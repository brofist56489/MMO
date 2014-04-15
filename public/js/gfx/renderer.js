var Render = {
	get renderer () {
		return this._renderer;
	},

	set renderer (val) {
		val.initialize();
		this._renderer = val;
	},

	_util_canvas: undefined,
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

	this._drawImageSimple = function(image, x, y) {
	};

	this._drawImageComplex = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
	};

	this.setTranslation = function(x, y) {
	};

	this.setScale = function(x, y) {
	};

	this.setRotation = function(rot) {
	};

	this.updateMatrix = function() {
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
	dbCanvas.imageSmoothingEnabled = false;
	dbCanvas.mozImageSmoothingEnabled = false;
	dbCanvas.msImageSmoothingEnabled = false;
	dbCanvas.webkitImageSmoothingEnabled = false;

	var scale_x = 1;
	var scale_y = 1;
	var rotation = 0;
	var trans_x = 0;
	var trans_y = 0;

	var matrix = ["unset"];
	
	var renderCtx = null;

	this.initialize = function() {
		this.domElement = document.createElement('canvas');
		this.domElement.imageSmoothingEnabled = false;
		this.domElement.mozImageSmoothingEnabled = false;
		this.domElement.msImageSmoothingEnabled = false;
		this.domElement.webkitImageSmoothingEnabled = false;

		this.setSize(this.width, this.height);

		// ctx = dbCanvas.getContext("2d");
		ctx = this.domElement.getContext('2d');
		this.updateMatrix();
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
		ctx.fillRect(-trans_x, -trans_y, this.width, this.height);
	};

	this._fillRect = function(x, y, w, h, color) {
		if(x + trans_x  < -w || y + trans_y < -h || x + trans_x >= this.width || y + trans_y >= this.height) return;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	};

	this._drawRect = function(x, y, w, h, color) {
		if(x + trans_x  < -w || y + trans_y < -h || x + trans_x >= this.width || y + trans_y >= this.height) return;
		ctx.strokeStyle = color;
		ctx.strokeRect(x, y, w, h);
	};

	this._fillCircle = function(x, y, r, color) {
		if(x + trans_x  < -2 * r || y + trans_y < -2 * r || x + trans_x >= this.width || y + trans_y >= this.height) return;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	};

	this._drawCircle = function(x, y, r, color) {
		if(x + trans_x  < -2 * r || y + trans_y < -2 * r || x + trans_x >= this.width || y + trans_y >= this.height) return;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
	};

	this._drawImageSimple = function(image, x, y) {
		if(x + trans_x  < -image.w || y + trans_y < -image.h || x + trans_x >= this.width || y + trans_y >= this.height) return;
		ctx.drawImage(image._domImage, x, y);
	};

	this._drawImageComplex = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
		if(dx + trans_x  < -dw || dy + trans_y < -dh || dx + trans_x >= this.width || dy + trans_y >= this.height) return;
		ctx.drawImage(image._domImagem, sx, sy, sw, sh, dx, dy, dw, dh);
	};

	this.updateMatrix = function() {
		matrix = [
			scale_x * Math.cos(rotation), -Math.sin(rotation), trans_x,
			Math.sin(rotation), scale_y * Math.cos(rotation), trans_y,
			0, 0, 1
		];
		ctx.setTransform(scale_x * Math.cos(rotation), Math.sin(rotation), -Math.sin(rotation), scale_y * Math.cos(rotation), trans_x, trans_y);
	};

	this.setTranslation = function(x, y) {
		trans_x = -(x * scale_x) + this.width / 2;
		trans_y = -(y * scale_y) + this.height / 2;
	};

	this.setScale = function(x, y) {
		var tempx = (trans_x - this.width / 2) / -scale_x,
			tempy = (trans_y - this.height / 2) / -scale_y;

		scale_x = x;
		scale_y = y;

		trans_x = -(tempx * scale_x) + this.width / 2;
		trans_y = -(tempy * scale_y) + this.height / 2;
	};

	this.setRotation = function(rot) {
		rotation = rot;
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
 * Draws [image] at [x], [y] without altering.
 * @param  {Render.Image} image the image
 * @param  {Number} x     x coordinate
 * @param  {Number} y     y coordinate
 */
Render.drawImageSimple = function(image, x, y) {
	Render._renderer._drawImageSimple(image, x, y);
};

/**
 * Draws [image] at [dx], [dy] with size [dw], [dh]
 * from [sx], [sy] with size [sw], [sh]
 * @param  {Render.Image} image the image
 * @param  {Number} sx    source-x
 * @param  {Number} sy    source-y
 * @param  {Number} sw    source-width
 * @param  {Number} sh    source-height
 * @param  {Number} dx    destination-x
 * @param  {Number} dy    destination-y
 * @param  {Number} dw    destination-width
 * @param  {Number} dh    destination-height
 */
Render.drawImageComplex = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
	Render._renderer._drawImageComplex(image, sx, sy, sw, sh, dx, dy, dw, dh);
};


/**
 * Translates camera so center is on [x], [y]
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 */
Render.setTranslation = function(x, y) {
	Render._renderer.setTranslation(x, y);
};

/**
 * Scales world size by [x] on x and [y] on y.
 * @param {Number} x x-coordinate
 * @param {Number} y y-coordinate
 */
Render.setScale = function(x, y) {
	Render._renderer.setScale(x, y);
};

/**
 * Rotates camera by [rot] radians.
 * @param {Number} rot rotation in radians
 */
Render.setRotation = function(rot) {
	Render._renderer.setRotation(rot);
};

/**
 * Updates the matrix of the camera.
 * CALL AFTER MAKING ANY TRANSFORMATION.
 */
Render.updateMatrix = function() {
	Render._renderer.updateMatrix();
};

/**
 * Finalizes the rendering process
 */
Render.finalizeRender = function() {
	Render._renderer._finalizeRender();
};


Render.Image = function() {
	this.width = -1;
	this.height = -1;

	this.src = "";
	this._domImage = null;
	this._onLoad = function() { };
	this.loaded = false;

	this._loadFromUrl = function(path, callback) {
		console.log(path);
		var _this = this;
		this.src = path;
		this._onLoad = callback;
		this._domImage = new Image();
		this._domImage.onload = function() {
			_this.width = _this._domImage.width;
			_this.height = _this._domImage.height;
			_this.loaded = true;
			if(callback)
				callback.call(_this);
		};
		this._domImage.src = this.src;
	};
};



Render.ImageUtils = {};

/**
 * Loads an image from [path].
 * @param  {String}   path      path to image
 * @param  {Function} callback  callback function
 * @return {Render.Image}       the image created
 */
Render.ImageUtils.loadImage = function(path, callback) {
	var image;
	try {
		image = new Render.Image();
		image._loadFromUrl(path, callback);
	} catch (e) {
		throw e;
	} finally {
		return image;
	}
};

/**
 * Tints the [image] with [color]
 * @param  {Render.Image}   image    the image
 * @param  {Number}   color    hex-representation of color: 0xff0000 - red
 * @return {Render.Image}      modified image
 */
Render.ImageUtils.tintImage = function(image, color) {
	Render._util_canvas = document.createElement("canvas");
	Render._util_canvas.width = image.width;
	Render._util_canvas.height = image.height;

	var ctx = Render._util_canvas.getContext("2d");
	ctx.drawImage(image._domImage, 0, 0);

	var rr = ((color >> 16) & 0xff) / 0xff;
	var gr = ((color >> 8) & 0xff) / 0xff;
	var br = ((color >> 0) & 0xff) / 0xff;

	var pixelData = ctx.getImageData(0, 0, image.width, image.height);
	for(var i=0, j=pixelData.width * pixelData.height; i < j; i++) {
		pixelData.data[i*4+0] = pixelData.data[i*4+0] * rr;
		pixelData.data[i*4+1] = pixelData.data[i*4+1] * gr;
		pixelData.data[i*4+2] = pixelData.data[i*4+2] * br;
		pixelData.data[i*4+3] = 255;
	}

	ctx.putImageData(pixelData, 0, 0);
	return Render.ImageUtils.loadImage(Render._util_canvas.toDataURL("image/png"), function() {
		Render._util_canvas = undefined;
		pixelData = null;
		ctx = null;
	});
};