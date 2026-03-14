//get the canvas element
const canvas = document.getElementById('renderCanvas');
//create the Babylon engine
const engine = new BABYLON.Engine(canvas, true);
//call the createScene function
const createScene = async function () {
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8,0.9,1);

/* Camera */
const camera = new BABYLON.ArcRotateCamera("camera",-Math.PI / 2,Math.PI / 2.5,15,new BABYLON.Vector3(0, 0, 0));
camera.attachControl(canvas, true);

/* Light */
const light = new BABYLON.HemisphericLight(
"light",
new BABYLON.Vector3(0,1,0),
scene
);
light.intensity = 1;
}