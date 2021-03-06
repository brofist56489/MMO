var Three = THREE;

var ThreeHandler = Class.extend({
    scene: null,
    renderer: null,
    camera: null,
    
    settings: {},
    
    init: function() {
        this.__makeDefaultSettings();
    },
    
    __makeDefaultSettings: function() {
        this.settings = {
            render: {
                width: 854,
                height: 480,
            },
            
            camera: {
                fov: 75,
                aspect: 854 / 480,
                near: 0.01,
                far: 1000.0,
            },
        };
    },
    
    setup: function() {
        this.renderer = new Three.WebGLRenderer();
        this.renderer.setSize(this.settings.render.width, this.settings.render.height);
        
        this.renderer.setClearColor(0x111111);
        
        // this.camera = new Three.PerspectiveCamera(
        //     this.settings.camera.fov,
        //     this.settings.camera.aspect,
        //     this.settings.camera.near,
        //     this.settings.camera.far
        // );

        this.camera = new Three.OrthographicCamera(
            -this.settings.render.width / 2, 
            this.settings.render.width / 2,
            this.settings.render.height / 2, 
            -this.settings.render.height / 2,
            this.settings.camera.near,
            this.settings.camera.far
        );

        this.scene = new Three.Scene();
        this.scene.add(this.camera);
        
        $("#webgl-container").append(this.renderer.domElement);
    },
    
    render: function() {
        this.stats.update();
        this.renderer.render(this.scene, this.camera);  
    },
});
