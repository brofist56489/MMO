var AssetLoader = Class.extend({
    filesToLoad: [],
    currentFile: -1,
    
    init: function() {
    },
    
    loadFiles: function() {
    },
});

var ScriptLoader = AssetLoader.extend({
    init: function() {
        this.filesToLoad = [
            "/js/game/gamesetup.js",
            "/js/game/gameupdater.js",

            "/js/util/cameracontrols.js",
            "/js/util/utils.js",
            
            "/js/input/mousehandler.js",
            
            "/js/vendor/stats.min.js",
            "/js/vendor/heightmap.js",
            
            "/js/gfx/threeHandler.js",
            
            "/js/world/world.js",
            "/js/world/worldgen.js",
        ];
    },
    
    loadFiles: function(callback) {
        var _this = this;
        var files = $.map(this.filesToLoad, function(file) {
            Cache.scripts[file.valueOf()] = $.getScript(file.valueOf());
            return Cache.scripts[file.valueOf()];
        });
        $.when.apply($, files).then(function() {
            _this.correctScripts();
            setTimeout(callback, 1);
        });
    },
    
    correctScripts: function() {
        var arr = Cache.scripts;
        for(var i in arr) {
            arr[i] = arr[i].responseText;
        }
        Cache.scripts = arr;
    },
});

var ImageLoader = AssetLoader.extend({
    init: function() {
        this.filesToLoad = [
            "/res/img/buildings.png",
            "/res/img/people.png",
            "/res/img/tiles.png",      
        ];
    },
    
    loadFiles: function(callback) {
        this.loadNextFile(callback);
    },
    
    loadNextFile: function(callback) {
        var _this = this;
        var files = $.map(this.filesToLoad, function(file) {
            Cache.images[file.valueOf()] = THREE.ImageUtils.loadTexture(file.valueOf());
            return Cache.images[file.valueOf()];
        });
        $.when.apply($, files).then(function() {
            setTimeout(callback, 1);
        });
    },
});