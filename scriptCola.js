const assetPath = "assets/models/";

var scene, camera, renderer, clock, box, mixer, actions = [], mode;

initialise()

function initialise() {
  console.log("Hello, World!");

  // Clock
  clock = new THREE.Clock();

  // Getting camera, scene, and renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x011638);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;

  const canvas = document.getElementById("threeContainer");
  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //document.body.appendChild(renderer.domElement);

  // Lights
  const lightPoint = new THREE.PointLight(0x404040, 4, 200);
  const lightAmbient = new THREE.AmbientLight(0x011638, 1);
  lightPoint.position.set(4, 16, 16);
  scene.add(lightPoint, lightAmbient);

  // Controls
  const orbit_controls = new THREE.OrbitControls(camera, renderer.domElement);
  mode = "open";
  const btn = document.getElementById("btn");
  
  orbit_controls.target.set(0, 0, 0);

  btn.addEventListener('click', () => {
    console.log("You clicked meh.")
    if (mode == "open") {
      actions.forEach(act => {
        // This assumes we have some animations in actions
        act.timeScale = 1;
        act.reset();
        act.play();
      });
    }
  })

  // Resize logic
  window.addEventListener('resize', onresize, false);
  window.addEventListener('load', onresize, false);

  animate();
}

// loader
const loader = new THREE.GLTFLoader();
loader.load(assetPath + "soda_can_opening.glb", (gltf) => {

  const model = gltf.scene;
  scene.add(model);
  scene.position.y = 6;

  mixer = new THREE.AnimationMixer(model);
  const animations = gltf.animations;
  animations.forEach(clip => {
    const action = mixer.clipAction(clip)
    actions.push(action)
  });
})

function animate() {
  requestAnimationFrame(animate);
  
  if (mixer) {
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}

function onresize() {
  const canvas = document.getElementById("threeContainer"); // ...?
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}