import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

window.addEventListener("keydown", (evt) => {
  //   console.log(evt.key);
  if (evt.key == "h") gui.show(gui._hidden);
});

gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// const axisHelper = new THREE.AxesHelper(1);
// scene.add(axisHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTextures = {
  mat1: textureLoader.load("/textures/matcaps/1.png"),
  mat2: textureLoader.load("/textures/matcaps/2.png"),
  mat3: textureLoader.load("/textures/matcaps/3.png"),
  mat4: textureLoader.load("/textures/matcaps/4.png"),
  mat5: textureLoader.load("/textures/matcaps/5.png"),
  mat6: textureLoader.load("/textures/matcaps/6.png"),
  mat7: textureLoader.load("/textures/matcaps/7.png"),
  mat8: textureLoader.load("/textures/matcaps/8.png"),
};

matcapTextures.mat1.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat2.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat3.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat4.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat5.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat6.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat7.colorSpace = THREE.SRGBColorSpace;
matcapTextures.mat8.colorSpace = THREE.SRGBColorSpace;

/** Fonts */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Don't buy the Dragon Fruit", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //   textGeometry.computeBoundingBox(); // it's a box which contains the text
  //   console.log(textGeometry.boundingBox);

  //   // translate to the left by half to center (more or less)
  //   textGeometry.translate(
  //     -textGeometry.boundingBox.max.x * 0.5,
  //     -textGeometry.boundingBox.max.y * 0.5,
  //     -textGeometry.boundingBox.max.z * 0.5
  //   );
  //   textGeometry.computeBoundingBox();
  //   console.log(textGeometry.boundingBox);
  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTextures.mat4;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  // Create donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTextures.mat8,
  });
  for (let i = 0; i < 300; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scalerValue = Math.random();
    donut.scale.x = scalerValue;
    donut.scale.y = scalerValue;
    donut.scale.z = scalerValue;

    scene.add(donut);
  }
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
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

window.addEventListener("dblclick", (evt) => {
  //   console.log(evt);
  //   console.log(!document.fullscreenElement);
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * 3D text (typeface format)
 *
 * we have to convert a text using facetype.js or use the ThreeJS fonts
 */
