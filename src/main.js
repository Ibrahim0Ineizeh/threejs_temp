import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights';
 
injectSpeedInsights();
inject();

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// ====================================
// =======  Object Section      =======
// ====================================

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({color: "teal"})
);
scene.add(box);

// ====================================
// =======  Light Section       =======
// ====================================

const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 2)
directionalLight.position.set(5, 4, -7)
scene.add(directionalLight)

// =========================================
// =======  Window Resizing Section  =======
// =========================================

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ====================================
// =======  Camera Section      =======
// ====================================

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
scene.add(camera);

// ====================================
// =======  Orbit Controls      =======
// ====================================

const controls = new OrbitControls(camera, canvas)

// ====================================
// =======  Renderer Section    =======
// ====================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

// ====================================
// =======  Animate Section     =======
// ====================================

const timer = new Timer();

const tick = () =>
{
    // Timer
    timer.update();
    const elapsedTime = timer.getElapsed();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick()