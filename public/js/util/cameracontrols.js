var __Control_States = {
	NONE: 0,
	MOVE: 1,
};

var CameraControl = Class.extend({
	camera: null,
	lastPos: null,

	speed: 1,

	state: 0,
	/**
	* @param camera {THREE.Camera} camera used in the scene
	*/
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

		// if(MouseJS.wheel != 0) {
		// 	if(MouseJS.wheel < 0) {
		// 		this.camera.position.z -= 0.1;
		// 	} else {
		// 		this.camera.position.z += 0.1;
		// 	}

		// 	// this.speed = 0.1 / this.camera.position.z;
		// }

		var mPos = new THREE.Vector2(MouseJS.xPos, MouseJS.yPos);
		if(this.lastPos == null) this.lastPos = mPos;
		var rel = new THREE.Vector2().subVectors(mPos, this.lastPos);
		if(rel.x != 0 || rel.y != 0) {
			if(this.state == __Control_States.MOVE) {
				var xDiff = MouseJS.xRel * this.speed;
				var yDiff = MouseJS.yRel * this.speed;

				this.camera.position.x -= xDiff;
				this.camera.position.y += yDiff;
			}
		}
		this.lastPos = mPos;
	},
});