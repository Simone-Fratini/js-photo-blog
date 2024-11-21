import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


const container = document.getElementById('container');
const imgNum = 6;
const overlay = document.getElementById('overlay');



axios.get(`https://jsonplaceholder.typicode.com/photos`, {
    params: {
        _limit: imgNum
    }
}).then(result => {
    result.data.forEach(element => {
        createCard(element);
    });
})


function createCard(element) {
    const cardTemplate = `
    <div class="card bg-white padding-20 debug">
                <img class="image" src="${element.url}" alt="try1">
                <p class="ptop-10 text">${element.title}</p>
                <div class="img-pin">
                    <img src="img/pin.svg" alt="pin">
                </div>
            </div>
    `
    container.innerHTML += cardTemplate;
}

document.addEventListener("click", (e) => {
    let cardClick = e.target.closest(".card");


    const parent = cardClick.parentElement;
    const sibling = cardClick.nextElementSibling;

    console.log(parent);
    // Sposta la carta nell'overlay
    overlay.appendChild(cardClick);
    overlay.classList.add("overlay");
    overlay.classList.remove("d-none");

    //chiusura sull'overlay
    overlay.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.classList.add("d-none");
        overlay.classList.remove("overlay");




        parent.insertBefore(cardClick, sibling);

    },
    );

});



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Aggiungi il canvas dopo il main
const main = document.querySelector('main');
const canvas = renderer.domElement;
main.insertAdjacentElement('afterend', canvas);

// Luce
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Posiziona la camera
camera.position.z = 10;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

// Modello OBJ (Bugatti o altro)
const loader = new OBJLoader();
let objModel;

loader.load(
    'models/bugatti.obj',
    (object) => {
        objModel = object;

        // Posizione iniziale del modello
        objModel.position.set(0, 0, 0); // Centra il modello
        objModel.scale.set(1, 1, 1);

        scene.add(objModel);


        console.log('Modello caricato:', objModel.position, objModel.scale);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% caricato');
    },
    (error) => {
        console.error('Errore nel caricamento:', error);
    }
);

// Gestione dello scroll per ruotare l'oggetto
window.addEventListener('scroll', () => {
    if (objModel) {
        const scrollY = window.scrollY;
        objModel.rotation.y = scrollY * 0.01; // Rotazione sull'asse Y
        objModel.position.y = -scrollY * 0.005; // Movimento sull'asse Y
    }
});

// Animazione continua
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

