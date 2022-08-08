import * as THREE from '../build/three.module.js';


class app {
    constructor() {
        const DivContainer = document.querySelector("#webgl-container");
        this._DivContainer = DivContainer;
        const renderer = new THREE.WebGLRenderer({ antialias:true });
        renderer.setPixelRatio(window.devicePixelRatio);
        DivContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
    _setupCamera(){
        const width = this._DivContainer.clientWidth;
        const height = this._DivContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width/height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    _setupModel(){
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 0x44a88});
        const cube = new THREE.Mesh(geometry, material);
        this._scene.add(cube);
        this._cube = cube;
    }
    resize(){
        const width = this._DivContainer.clientWidth;
        const height = this._DivContainer.clientHeight;
        this._camera.aspect = width/height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }
    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001;//time = time * 0.001
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
        }
}

window.onload = function(){
    new app();
}