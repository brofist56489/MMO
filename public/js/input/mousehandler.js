
//Dont need a class cuz its just static.
var MouseJS = {
    buttons: [],
    
    //Current position
    xPos: 0,
    yPos: 0,
    
    //Relative speed since last check.
    xRel: 0,
    yRel: 0,
    
    // param: jObject is a jQuery object
    __registerCallbacks: function(jObject) {
        jObject.mousedown(function(e) {
            MouseJS.__onDown(e);
        });
        jObject.mouseup(function(e) {
            MouseJS.__onUp(e);
        });
    },
};