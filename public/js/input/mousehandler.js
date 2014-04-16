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

    //Mouse wheel scrolling
    wheel: 0,
    
    __registerCallbacks: function(jObject) {
        jObject.mousedown(function(e) {
            return MouseJS.__onDown(e);
        });
        $(document).mouseup(function(e) {
            return MouseJS.__onUp(e);
        });
        jObject.mousemove(function(e) {
            return MouseJS.__onMove(e); 
        });
        jObject.bind('mousewheel DOMMouseScroll', function(e) {
            return MouseJS.__onScroll(e);
        });
        jObject.bind('contextmenu', function(e) { return false; });
    },
    
    __onDown: function(event) {
        event.preventDefault();
        this.buttons[event.button || event.which] = true;
        return false;
    },
    
    __onUp: function(event) {
        event.preventDefault();
        this.buttons[event.button || event.which] = false;
        return false;
    },
    
    __onMove: function(event) {
        event.preventDefault();
        this.xRel = event.clientX - this.xPos;
        this.yRel = event.clientY - this.yPos;
        this.xPos = event.clientX;
        this.yPos = event.clientY;
        
        this.xUnProj = (this.xPos / this.__width) * 2 - 1;
        this.yUnProj = (this.yPos / this.__height) * -2 + 1;
        return false;
    },

    __onScroll: function(event) {
        event.preventDefault();
        if(event.originalEvent.wheelDelta < 0 || event.originalEvent.detail > 0) {
            //down
            this.wheel = 1;
        } else {
            //up
            this.wheel = -1;  
        }
        return false;
    },
    
    // param: jObject is a jQuery object
    init: function(jObject) {
        this.__registerCallbacks(jObject);
        
        this.__width = jObject.width();
        this.__height = jObject.height();
    },

    /**
    * Call near end of updating.
    */
    update: function() {
        this.xRel = 0;
        this.yRel = 0;

        this.wheel = 0;
    },
};