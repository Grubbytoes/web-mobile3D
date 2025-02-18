var scene, camera, renderer, box;

initialise()

function initialise() {
  console.log("Hello, World!");
  

  // Getting camera, scene, and renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x011638);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const lightMain = new THREE.PointLight( 0xffffff, 1, 100 );
  lightMain.position.set(0, 0, 10);
  scene.add(lightMain);

  // Material and mesh
  const material = new THREE.MeshStandardMaterial();
  material.color.set(0xcdcdcd)
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // Adding the box
  box = new THREE.Mesh(cubeGeometry, material);
  box.position.set(0, 0, 0);
  scene.add(box);

  // Resize logic
  window.addEventListener('resize', onresize, false);
  update();
}

function update() {
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  box.rotation.y += 0.02;
  box.rotation.z += 0.01;
}

function onresize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}