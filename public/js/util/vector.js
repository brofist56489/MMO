var Vector2 = function(x, y) {

	/**
	 * Any functions with a 'Self' at the end
	 * directly affects the object. Any without
	 * don't affect the object.
	 */

	this.x = x || 0;
	this.y = y || 0;

	this.add = function(v2) {
		return new Vector2(this.x + v2.x, this.y + v2.y);
	};

	this.sub = function(v2) {
		return new Vector2(this.x - v2.x, this.y - v2.y);
	};

	this.mul = function(v2) {
		return new Vector2(this.x * v2.x, this.y * v2.y);
	};

	this.div = function(v2) {
		return new Vector2(this.x / v2.x, this.y / v2.y);
	};

	this.mulScalar = function(sca) {
		return new Vector2(this.x * sca, this.y * sca);
	};

	this.divScalar = function(sca) {
		return new Vector2(this.x / sca, this.y / sca);
	};

	this.addSelf = function(v2) {
		this.x += v2.x;
		this.y += v2.y;
	};

	this.subSelf = function(v2) {
		this.x -= v2.x;
		this.y -= v2.y;
	};

	this.mulSelf = function(v2) {
		this.x *= v2.x;
		this.y *= v2.y;
	};

	this.divSelf = function(v2) {
		this.x /= v2.x;
		this.y /= v2.y;
	};

	this.mulScalarSelf = function(sca) {
		this.x *= sca;
		this.y *= sca;
	};

	this.divScalarSelf = function(sca) {
		this.x /= sca;
		this.y /= sca;
	};

	this.lengthSq = function() {
		return this.x * this.x + this.y * this.y;
	};

	this.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	this.normalize = function() {
		var l = this.length;
		var x = this.x / l;
		var y = this.y / l;
		return new Vector2(x, y);
	};

	this.normalizeSelf = function() {
		var l = this.length;
		var x = this.x / l;
		var y = this.y / l;
		this.x = x;
		this.y = y;
	};

	this.dot = function(v2) {
		return this.x * v2.x + this.y * v2.y;
	};

	this.cross = function(v2) {
		return this.x * v2.y - this.y * v2.x;
	};

	this.pointTo = function(v2, scale) {
		var scale = scale || 1;
		var ang = Math.atan2(v2.y - this.y, v2.x - this.x);
		var x = Math.cos(ang) * scale;
		var y = Math.sin(ang) * scale;
		return new Vector2(x, y);
	};

	this.pointToSelf = function(v2, scale) {
		var scale = scale || 1;
		var ang = Math.atan2(v2.y - this.y, v2.x - this.x);
		this.x = Math.cos(ang) * scale;
		this.y = Math.sin(ang) * scale;
	};
};

var Matrix2 = function(m11, m12, m21, m22) {
	/*
	Number notation
	m + column + row
	m12 = column: 1 row: 2
	 */

	this.m11 = m11 || 1;
	this.m12 = m12 || 0;
	this.m21 = m21 || 0;
	this.m22 = m22 || 1;

	this.mul = function(m2) {
		var a11, a12, a21, a22,
			o11 = this.m11, o12 = this.m12, o21 = this.m21,	o22 = this.m22,
			n11 = m2.m11, n12 = m2.m12, n21 = m2.m21, n22 = m2.m22;
		a11 = o12 * n21 + o11 * n11;
		a12 = o12 * n22 + o11 * n12;
		a21 = o22 * n21 + o21 * n11;
		a22 = o22 * n22 + o21 * n12;
		return new Matrix2(a11, a12, a21, a22);
	};

	this.mulScalar = function(sca) {
		var a11, a12, a21, a22;
		a11 = this.m11 * sca;
		a12 = this.m12 * sca;
		a21 = this.m21 * sca;
		a22 = this.m22 * sca;
		return new Matrix2(a11, a12, a21, a22);
	};

	this.mulSelf = function(m2) {
		var o11 = this.m11, o12 = this.m12, o21 = this.m21,	o22 = this.m22,
			n11 = m2.m11, n12 = m2.m12, n21 = m2.m21, n22 = m2.m22;
		this.m11 = o12 * n21 + o11 * n11;
		this.m12 = o12 * n22 + o11 * n12;
		this.m21 = o22 * n21 + o21 * n11;
		this.m22 = o22 * n22 + o21 * n12;
	};

	this.mulScalarSelf = function(sca) {
		this.m11 *= sca;
		this.m12 *= sca;
		this.m21 *= sca;
		this.m22 *= sca;
	};

	this.mulVector = function(v2) {
		var a11, a12, a21, a22,
			o11 = this.m11, o12 = this.m12, o21 = this.m21,	o22 = this.m22,
			n1 = v2.x, n2 = v2.y;

		a11 = o11 * n1;
		a12 = o12 * n2;
		a21 = o21 * n1;
		a22 = o22 * n2;
		return new Matrix2(a11, a12, a21, a22);
	};

	this.mulVectorSelf = function(v2) {
		var o11 = this.m11, o12 = this.m12, o21 = this.m21,	o22 = this.m22,
			n1 = v2.x, n2 = v2.y;

		this.m11 = o11 * n1;
		this.m12 = o12 * n2;
		this.m21 = o21 * n1;
		this.m22 = o22 * n2;
	};
};