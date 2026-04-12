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

/*cafe-Table */
const table = BABYLON.MeshBuilder.CreateBox("table", {width: 4, height: 1.5, depth: 1}, scene);
table.position = new BABYLON.Vector3(0, 0.75, 4);

const tableMat = new BABYLON.StandardMaterial("tableMat", scene);
tableMat.diffuseColor = new BABYLON.Color3(0.6,0.3,0.1);
table.material = tableMat;

/*cafe-Avatar */

    const barista = BABYLON.SceneLoader.ImportMeshAsync("", "../meshes/", "barista3.glb").then((result) => {
        // Do this stuff after the mesh has loaded
        const baristaMesh = result.meshes[0];
        // Grab the bouding box
        const baristaBounds = result.meshes[1];
        baristaBounds.showBoundingBox = true;
        // wheelMesh.position = new BABYLON.Vector3(0, 0, 0);
        baristaMesh.scaling = new BABYLON.Vector3(50, 50, 70);
        baristaMesh.position = new BABYLON.Vector3(0.3, 0.9, 4.9);
    }).catch((error) => {
        // Oops, the mesh didn't load for some reason
        console.error("Error loading mesh: " + error);
        return null;
    });



const waiter = BABYLON.SceneLoader.ImportMeshAsync("", "../meshes/", "waiter.glb").then((result) => {
    // Do this stuff after the mesh has loaded
    const waiterMesh = result.meshes[0];
    waiterMesh.scaling = new BABYLON.Vector3(50, 50, 70);
    waiterMesh.position = new BABYLON.Vector3(1.5, 0, 0.2);
}).catch((error) => {
    // Oops, the mesh didn't load for some reason
    console.error("Error loading mesh: " + error);
    return null;
});


const customer = BABYLON.SceneLoader.ImportMeshAsync("", "../meshes/", "customer1.glb").then((result) => {
    // Do this stuff after the mesh has loaded
    const customerMesh = result.meshes[0];
    customerMesh.scaling = new BABYLON.Vector3(50, 50, 70);
    customerMesh.position = new BABYLON.Vector3(-3, 0.5, -0.1);
}).catch((error) => {
    // Oops, the mesh didn't load for some reason
    console.error("Error loading mesh: " + error);
    return null;
});


/*Chair */
const chair = BABYLON.MeshBuilder.CreateBox("chair", {width: 1, height: 1, depth: 1}, scene);
chair.position = new BABYLON.Vector3(-2, 0.5, 0);
const chairMat = new BABYLON.StandardMaterial("chairMat", scene);
chairMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
chair.material = chairMat;

/* GUI Text*/

const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

const text = new BABYLON.GUI.TextBlock();

text.text = "Click the avatar to start conversation";
text.color = "white";
text.fontSize = 30;
text.top = "-40%";

gui.addControl(text);

/* Interaction */
barista.actionManager = new BABYLON.ActionManager(scene);

barista.actionManager.registerAction(
new BABYLON.ExecuteCodeAction(
BABYLON.ActionManager.OnPickTrigger,
function(){
text.text = "Hello! What would you like to order?";
}
)
);

waiter.actionManager = new BABYLON.ActionManager(scene);

waiter.actionManager.registerAction(
new BABYLON.ExecuteCodeAction(
BABYLON.ActionManager.OnPickTrigger,
function(){
text.text = "Would you like coffee or tea?";
}
)
);

customer.actionManager = new BABYLON.ActionManager(scene);

customer.actionManager.registerAction(
new BABYLON.ExecuteCodeAction(
BABYLON.ActionManager.OnPickTrigger,
function(){
text.text = "Is this seat taken?";
}
)
);



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