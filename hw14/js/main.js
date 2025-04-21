var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cube, cube2, cube3, cube4;
var modelObject;


// create the first box
function createBox() {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xe59866 });
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(18, 0, 15);
    scene.add(cube);
    cube.scale.set(5, 5, 5);
    animate();
}
// animate first box
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.03;
    renderer.render(scene, camera);
}


// create the second box, this is a sphere, it is a child of the first box
function createBox2() {
    var geometry = new THREE.SphereGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xf5b7b1 });
    cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(10, 15, 5);
    cube.add(cube2);
    cube2.scale.set(3, 3, 3);
    animateBox2();
}
// animate second box
function animateBox2() {
    requestAnimationFrame(animateBox2);
    if (cube2) {
        cube2.rotation.x += 0.04;
        cube2.rotation.y += 0.01;
    }
}


// create the third box. it is a child of the first box
function createBox3() {
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0xfcf3cf });
    cube3 = new THREE.Mesh(geometry, material);
    cube3.position.set(0, 5, 10);
    cube.add(cube3);
    cube3.scale.set(8, 8, 8);
    animateBox3();
}
// animate third box
function animateBox3() {
    requestAnimationFrame(animateBox3);
    if (cube3) {
        cube3.rotation.x += 0.02;
        cube3.rotation.y += 0.04;
    }
}



// create the fourth box, this is a sphere, it is a child of the first box
function createBox4() {
    var geometry = new THREE.SphereGeometry(1, 32, 32); // Create a sphere geometry
    var material = new THREE.MeshBasicMaterial({ color: 0xe4f89a });
    cube4 = new THREE.Mesh(geometry, material);
    cube4.position.set(18, 0, 8);
    cube.add(cube4);
    cube4.scale.set(2, 2, 2);
    animateBox4();
    }
    
function animateBox4() {
    requestAnimationFrame(animateBox4);
    if (cube4) {
        cube4.rotation.x += 0.05;
        cube4.rotation.y += 0.05 ;
    }
}
    






/**
 * Generate a scene object with a background color
 **/

function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd1f2eb);
  return scene;
}

/**
 * Generate the camera to be used in the scene. Camera args:
 *   [0] field of view: identifies the portion of the scene
 *     visible at any time (in degrees)
 *   [1] aspect ratio: identifies the aspect ratio of the
 *     scene in width/height
 *   [2] near clipping plane: objects closer than the near
 *     clipping plane are culled from the scene
 *   [3] far clipping plane: objects farther than the far
 *     clipping plane are culled from the scene
 **/

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}

/**
 * Generate the light to be used in the scene. Light args:
 *   [0]: Hexadecimal color of the light
 *   [1]: Numeric value of the light's strength/intensity
 *   [2]: The distance from the light where the intensity is 0
 * @param {obj} scene: the current scene object
 **/

function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(20, 50, 20);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
  return light;
}

/**
 * Generate the renderer to be used in the scene
 **/

function getRenderer() {
  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // Add support for retina displays
  renderer.setPixelRatio(window.devicePixelRatio);
  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Add the canvas to the DOM
  document.body.appendChild(renderer.domElement);
  return renderer;
}

/**
 * Generate the controls to be used in the scene
 * @param {obj} camera: the three.js camera for the scene
 * @param {obj} renderer: the three.js renderer for the scene
 **/

function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

/**
 * Load Skull model
 **/

function loadModel() {
  loader = new THREE.OBJLoader();
  loader.load('models/WaltHead.obj', function (object) {
    object.rotation.z = Math.PI;
    modelObject = object;
    object.scale.set(1, 1, 1);
    scene.add(object);
    animateModel();
  });
}

function animateModel() {
  requestAnimationFrame(animateModel);
  modelObject.rotation.x += 0.02;
  modelObject.rotation.y += 0.02;
}


/**
 * Render!
 **/

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);


createBox();
createBox2();
createBox3();
createBox4();

loadModel();

render();
