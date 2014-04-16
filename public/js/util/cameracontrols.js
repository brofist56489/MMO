var __Control_States = {
	NONE: 0,
	MOVE: 1,
};

var CameraControl = Class.extend({
	renderer: null,
	lastPos_x: -1,
	lastPos_y: -1,

	speed: 1,

	state: 0,

	init: function(renderer) {
		this.renderer = renderer;
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

		if(this.lastPos_x == null || this.lastPos_y == null) {
			this.lastPos_x = MouseJS.xPos;
			this.lastPos_y = MouseJS.yPos;
		}
		var rel_x = MouseJS.xPos - this.lastPos_x;
		var rel_y = MouseJS.yPos - this.lastPos_y;
		if(rel_x != 0 || rel_y != 0) {
			if(this.state == __Control_States.MOVE) {
				var xDiff = MouseJS.xRel * this.speed;
				var yDiff = MouseJS.yRel * this.speed;

				this.renderer.translate(-xDiff, -yDiff);
				this.renderer.updateMatrix();
			}
		}
		this.lastPos_x = MouseJS.xPos;
		this.lastPos_y = MouseJS.yPos;
	},
});