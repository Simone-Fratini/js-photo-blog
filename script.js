

const image = document.getElementsByClassName('image');
const imgArray = [];
const imgNum = 6;

console.log(image[0].src);

axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6`).then(result => {
    result.data.forEach(element => {
        imgArray.push(element.url);
    });
}).finally(changeImg);

function changeImg() {

    for (let i = 0; i <= imgArray.length; i++) {

        image[i].src = imgArray[i];
    }
}

