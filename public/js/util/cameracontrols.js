var __Control_States = {
	NONE: 0,
	MOVE: 1,
};

var CameraControl = Class.extend({
	camera: null,
	lastPos: null,

	speed: 0.25,

	state: 0,

	init: function(camera) {
		this.camera = camera;
	},

	update: function() {
		if(this.state == __Control_States.MOVE) {
			if(MouseJS.buttons[1] == false) {
				this.state = __Control_States.NONE;
			}
		}
		else if(this.state == __Control_States.NONE) {
			if(MouseJS.buttons[1] == true) {
				this.state = __Control_States.MOVE;
			}
		}

		var mPos = new THREE.Vector2(MouseJS.xPos, MouseJS.yPos);
		if(this.lastPos == null) this.lastPos = mPos;
		var rel = new THREE.Vector2().subVectors(mPos, this.lastPos);
		if(rel.x != 0 || rel.y != 0) {
			if(this.state == __Control_States.MOVE) {
				var xDiff = MouseJS.xRel * -this.speed;
				var yDiff = MouseJS.yRel * -this.speed;

				this.camera.position.x += xDiff;
				this.camera.position.z += yDiff;
			}
		}
		this.lastPos = mPos;
	},
});