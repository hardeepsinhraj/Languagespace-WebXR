//get the canvas element
const canvas = document.getElementById('renderCanvas');
//create the Babylon engine
const engine = new BABYLON.Engine(canvas, true);
//call the createScene function
const createScene = async function () {
    
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.8,0.9,1);

// enable AR
const xr = await scene.createDefaultXRExperienceAsync();

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

// Walls
//Back wall
const backWall = BABYLON.MeshBuilder.CreateBox(
"backWall",
{width: 20, height: 8, depth: 0.5},
scene
);

backWall.position = new BABYLON.Vector3(0, 1.5, 10);


//left wall
const leftWall = BABYLON.MeshBuilder.CreateBox(
"leftWall",
{width: 0.5, height: 5, depth: 15},
scene
);

leftWall.position = new BABYLON.Vector3(-7, 2.5, 4.9);

//right wall
const rightWall = BABYLON.MeshBuilder.CreateBox(
"rightWall",
{width: 0.5, height: 5, depth: 15},
scene
);

rightWall.position = new BABYLON.Vector3(7, 2.5, 5);

const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
wallMat.diffuseColor = new BABYLON.Color3(1, 0.9, 0.8); // warm cafe color

backWall.material = wallMat;
leftWall.material = wallMat;
rightWall.material = wallMat;


/*cafe-Table */
const table = BABYLON.MeshBuilder.CreateBox("table", {width: 4, height: 1.5, depth: 1}, scene);
table.position = new BABYLON.Vector3(0, 0.75, 4);



const tableMat = new BABYLON.StandardMaterial("tableMat", scene);
tableMat.diffuseColor = new BABYLON.Color3(0.6,0.3,0.1);
table.material = tableMat;

/*cafe-Avatar */

// BARISTA

let baristaMeshes;

await BABYLON.SceneLoader.ImportMeshAsync("", "meshes/", "barista3.glb", scene)
.then((result) => {

    baristaMeshes = result.meshes;
    const rootMesh = result.meshes[0];
    baristaMeshes.forEach(mesh => {

        if (!mesh.getTotalVertices || mesh.getTotalVertices() === 0) return;

        mesh.scaling = new BABYLON.Vector3(50, 50, 70);
        mesh.position = new BABYLON.Vector3(0.3, -4.7, 0.5);
        mesh.rotation.y += Math.PI;
        mesh.isPickable = true;
    });
});


// WAITER
let waiterMeshes;

await BABYLON.SceneLoader.ImportMeshAsync("", "meshes/", "waiter.glb", scene)
.then((result) => {

    waiterMeshes = result.meshes;

    waiterMeshes.forEach(mesh => {

        if (!mesh.getTotalVertices || mesh.getTotalVertices() === 0) return;

        mesh.scaling = new BABYLON.Vector3(50, 50, 70);
        mesh.position = new BABYLON.Vector3(-1.5, 0, 0.2);
        mesh.isPickable = true;
    });
});

// CUSTOMER
let customerMeshes;

await BABYLON.SceneLoader.ImportMeshAsync("", "meshes/", "customer1.glb", scene)
.then((result) => {

    customerMeshes = result.meshes;

    customerMeshes.forEach(mesh => {

        if (!mesh.getTotalVertices || mesh.getTotalVertices() === 0) return;

        mesh.scaling = new BABYLON.Vector3(50, 50, 70);
        mesh.position = new BABYLON.Vector3(3, 0, 0.3);
        mesh.isPickable = true;
    });
});



/*Chair */

const chair = BABYLON.MeshBuilder.CreateBox("chair", {width: 0.5, height: 0.5, depth: 0.5}, scene);
chair.position = new BABYLON.Vector3(-2, 0.5, 0);
const chairMat = new BABYLON.StandardMaterial("chairMat", scene);
chairMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
chair.material = chairMat;

const table3 = table.clone("table3");
table3.position = new BABYLON.Vector3(-3, 0.75, -6);

const chair3 = chair.clone("chair3");
chair3.position = new BABYLON.Vector3(-3, 0.5, -4.5);

const table4 = table.clone("table4");
table4.position = new BABYLON.Vector3(3, 0.75, -6);

const chair4 = chair.clone("chair4");
chair4.position = new BABYLON.Vector3(3, 0.5, -4.5);

/*Tree */
 const tree = BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "tree.glb").then((result) => {
        result.meshes[0].position = new BABYLON.Vector3(-8, 0.1, -7.5);
        
        result.meshes[0].scaling = new BABYLON.Vector3(250, 250, 250);
    });

    /*tree2 */
    const tree2 = BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "tree2.glb").then((result) => {
        result.meshes[0].position = new BABYLON.Vector3(8, 0.1, -7.5);
        result.meshes[0].scaling = new BABYLON.Vector3(150, 150, 150);
    });

/* GUI Text*/

const gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

const text = new BABYLON.GUI.TextBlock();

text.text = "Click the avatar to start conversation";
text.color = "white";
text.fontSize = 30;
text.top = "-5%";

gui.addControl(text);

/* Interaction */

baristaMeshes.forEach(mesh => {

    mesh.actionManager = new BABYLON.ActionManager(scene);

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(){
                text.text = "Hello! What would you like to order?";
            }
        )
    );
});

waiterMeshes.forEach(mesh => {

    mesh.actionManager = new BABYLON.ActionManager(scene);

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(){
                text.text = "Would you like coffee or tea?";
            }
        )
    );
});

customerMeshes.forEach(mesh => {

    mesh.actionManager = new BABYLON.ActionManager(scene);

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(){
                text.text = "Is this seat taken?";
            }
        )
    );
});


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