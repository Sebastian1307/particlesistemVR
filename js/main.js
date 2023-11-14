import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";

const scene = new THREE.Scene();
const colorbg = new THREE.Color(0x0000ff);
scene.background = colorbg;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;

let miscubos = [];

function objfis(pox, poy, vy, vx, vz, ay, ax, az, tamañoinicial) {
    const colore = new THREE.Color(0xffffff);
    colore.setHex(Math.random() * 0xffffff);
    const geometry = new THREE.BoxGeometry(tamañoinicial, tamañoinicial, tamañoinicial);
    const material = new THREE.MeshBasicMaterial({ color: colore });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = pox;
    cube.position.y = poy;
    scene.add(cube);

    this.actualizar = function () {
        vy += ay;
        vx += ax;
        vz += az;
        cube.position.y += vy;
        cube.position.x += vx;
        cube.position.z += vz;
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;

        // Verificar si el cubo está fuera de la vista y recrearlo
        if (cube.position.y < -15) {
            resetCube(cube);
        }
    };

    function resetCube(cube) {
        cube.position.y = 15;
        cube.position.x = getRandomInt(-10, 10);
        cube.position.z = 0;
        vy = getRandomInt(0.01, 0.06);
        vx = getRandomInt(0.01, 0.06);
        vz = getRandomInt(0.01, 0.06);
    }
}

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

// Crear algunos cubos iniciales
for (let i = 0; i < 10; i++) {
    const micubo = new objfis(getRandomInt(-10, 10), getRandomInt(0, 15), getRandomInt(0.01, 0.06), getRandomInt(0.01, 0.06), getRandomInt(0.01, 0.06), -0.02, getRandomInt(-0.01, 0.02), getRandomInt(-0.01, 0.02), getRandomInt(0.2, 1.5));
    miscubos.push(micubo);
}

renderer.setAnimationLoop( function () {

	renderer.render( scene, camera );

} );

function animate() {
    requestAnimationFrame(animate);

    // Actualizar y renderizar cada cubo
    miscubos.forEach((cubo) => {
        cubo.actualizar();
    });

    renderer.render(scene, camera);
}

animate();
