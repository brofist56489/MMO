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
            
            "/js/gfx/renderer.js",
            
            "/js/world/tiles/tile.js",
            "/js/world/tiles/tilemap.js",
            "/js/world/world.js",
            "/js/world/worldgen.js",
        ];
    },
    
    loadFiles: function(callback) {
        var _this = this;
        var files = $.map(this.filesToLoad, function(file) {
            Cache.scripts[file.valueOf()] = $.getScript(file.valueOf()).fail(function(){ alert(arguments[2].toString()); });
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
            "/res/img/tiles/grass.png",
            "/res/img/tiles/stone.png",
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
            _this.correctImages();
            setTimeout(callback, 1);
        });
    },

    correctImages: function() {
        _.forEach(Cache.images, function(text) {
            text.minFilter = THREE.NearestFilter;
            text.magFilter = THREE.NearestFilter;
        });
    },
});