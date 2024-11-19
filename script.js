const container = document.getElementById('container');
const imgNum = 6;



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

document.addEventListener('click', (e) => {
    let cardClick = e.target.closest('.card');
    cardClick.classList.add("d-none");
    const overlayTemplate = `
    <div class="card-overlay bg-white debug padding-20">
            <img class="image" src="https://picsum.photos/300/300" alt="try1">
            <p class="ptop-10 text">${element.title}</p>
            <div class="img-pin">
                <img src="img/pin.svg" alt="pin">
            </div>
        </div>
    `



})
