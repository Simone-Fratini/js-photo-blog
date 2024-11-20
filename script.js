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

    // Sposta la carta nell'overlay
    overlay.appendChild(cardClick);
    overlay.classList.add("overlay");
    overlay.classList.remove("d-none");

    //chiusura sull'overlay
    overlay.addEventListener("click", () => {
        overlay.classList.add("d-none");
        overlay.classList.remove("overlay");


        // Ripristina la carta nel suo contenitore originale  ma da errore!!!

        parent.insertBefore(cardClick, sibling);

    },
    );

});



