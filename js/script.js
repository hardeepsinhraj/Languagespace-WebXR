//get the canvas element
const canvas = document.getElementById('renderCanvas');
//create the Babylon engine
const engine = new BABYLON.Engine(canvas, true);
//call the createScene function
const createScene = async function () {
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8,0.9,1);

/* Camera */
const camera = new BABYLON.ArcRotateCamera("camera",-Math.PI / 2,Math.PI / 2.5,15,new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

/* Light */
const light = new BABYLON.HemisphericLight(
"light",
new BABYLON.Vector3(0,1,0),
scene
);
light.intensity = 1;


/*Ground */
const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
groundMat.diffuseColor = new BABYLON.Color3(0.4, 0.8, 0.4);
ground.material = groundMat;

/*Table */
const table = BABYLON.MeshBuilder.CreateBox("table", {width: 2, height: 1, depth: 1}, scene);
table.position.y = 0.5;
const tableMat = new BABYLON.StandardMaterial("tableMat", scene);
tableMat.diffuseColor = new BABYLON.Color3(0.6, 0.3, 0.1);
table.material = tableMat;

/*Avatar */
const avatar = BABYLON.MeshBuilder.CreateSphere("avatar", {diameter: 1}, scene);
avatar.position = new BABYLON.Vector3(2, 1, 0);
const avatarMat = new BABYLON.StandardMaterial("avatarMat", scene);
avatarMat.diffuseColor = new BABYLON.Color3(1, 0.2, 0.2);
avatar.material = avatarMat;

/*Chair */
const chair = BABYLON.MeshBuilder.CreateBox("chair", {width: 1, height: 1, depth: 1}, scene);
chair.position = new BABYLON.Vector3(-2, 0.5, 0);
const chairMat = new BABYLON.StandardMaterial("chairMat", scene);
chairMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.8);
chair.material = chairMat;


return scene;
};

createScene().then((scene) => {
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });
});