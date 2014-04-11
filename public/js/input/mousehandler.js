//TODO Implement a callback system for this.


//Dont need a class cuz its just static.
var MouseJS = {
    buttons: [],
    
    //Current position
    xPos: 0,
    yPos: 0,
    
    //Relative speed since last check.
    xRel: 0,
    yRel: 0,
    
    //Unprojected coord
    xUnProj: 0,
    yUnProj: 0,
    
    
    //Width and Height of the containing... container.
    __width: 0,
    __height: 0,
    
    __registerCallbacks: function(jObject) {
        jObject.mousedown(function(e) {
            MouseJS.__onDown(e);
        });
        jObject.mouseup(function(e) {
            MouseJS.__onUp(e);
        });
        jObject.mousemove(function(e) {
            MouseJS.__onMove(e); 
        });
    },
    
    __onDown: function(event) {
        this.buttons[event.button || event.which] = true;
    },
    
    __onUp: function(event) {
        this.buttons[event.button || event.which] = false;
    },
    
    __onMove: function(event) {
        this.xRel = event.clientX - this.xPos;
        this.yRel = event.clientY - this.yPos;
        this.xPos = event.clientX;
        this.yPos = event.clientY;
        
        this.xUnProj = (this.xPos / this.__width) * 2 - 1;
        this.yUnProj = (this.yPos / this.__height) * -2 + 1;
    },
    
    // param: jObject is a jQuery object
    init: function(jObject) {
        this.__registerCallbacks(jObject);
        
        this.__width = jObject.width();
        this.__height = jObject.height();
    },
};