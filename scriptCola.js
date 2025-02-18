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
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const lightPoint = new THREE.PointLight(0x404040, 4, 200);
  const lightAmbient = new THREE.AmbientLight(0x011638, 1);
  lightPoint.position.set(4, 8, 16);
  scene.add(lightPoint, lightAmbient);

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  mode = "open";
  const btn = document.getElementById("btn");
  btn.addEventListener('click', () => {
    console.log("You clicked meh.")
    if (mode == "open") {
      actions.array.forEach(act => {
        // This assumes we have some animations in actions
        act.timeScale = 1;
        act.reset();
        act.play();
      });
    }
  })

  // Resize logic
  window.addEventListener('resize', onresize, false);

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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}