// Importa Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Configura il renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Aggiungi il canvas dopo il tag <main>
const main = document.querySelector('main'); // Seleziona il tag <main>
const canvas = renderer.domElement; // Ottieni il canvas creato dal renderer
main.insertAdjacentElement('afterend', canvas); // Inserisci il canvas dopo il main

// Luce
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Camera iniziale
camera.position.z = 5;

// Caricamento modello OBJ
const loader = new THREE.OBJLoader();
let objModel;

loader.load(
    'path/to/your/model.obj', // Percorso del file .obj
    (object) => {
        objModel = object;
        objModel.scale.set(1, 1, 1); // Scala del modello
        scene.add(objModel);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% caricato');
    },
    (error) => {
        console.error('Errore nel caricamento:', error);
    }
);

// Gestione dello scroll per muovere l'oggetto
window.addEventListener('scroll', () => {
    if (objModel) {
        const scrollY = window.scrollY;
        objModel.rotation.y = scrollY * 0.01;
        objModel.position.y = -scrollY * 0.005;
    }
});

// Animazione continua
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
