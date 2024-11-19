

const image = document.getElementsByClassName('image');
const text = document.getElementsByClassName('text')
const imgArray = [];
const textArray = [];
const imgNum = 6;

console.log(text);

axios.get(`https://jsonplaceholder.typicode.com/photos`, {
    params: {
        _limit: imgNum
    }
}).then(result => {
    result.data.forEach(element => {
        imgArray.push(element.url);
        textArray.push(element.title);
    });
    updateCard();
})

function updateCard() {
    console.log(imgArray)
    for (let i = 0; i < imgNum; i++) {
        image[i].src = imgArray[i];
        text[i].innerText = textArray[i];
    }
}

