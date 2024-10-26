const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.textContent = 'OK';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.textContent = 'NOT OK';
        phoneResult.style.color = 'red';
    }
}
//
const tabContentBlock = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideTabContent = () => {
    tabContentBlock.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index) => {
    tabContentBlock[index].style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent(0);

setInterval(() => {
    currentIndex = (currentIndex + 1) % tabItems.length;
    hideTabContent();
    showTabContent(currentIndex);
}, 3000);

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(index);
                currentIndex = index;
            }
        });
    }
};

// CONVERTER

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.getElementById('eur');

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();

            if (element.id === 'som') {
                targetElement1.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur).toFixed(2);
            }
            else if (element.id === 'usd') {
                targetElement1.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2);
            }
            else if (element.id === 'eur') {
                targetElement1.value = (element.value * data.eur).toFixed(2);
                targetElement2.value = (element.value * (data.eur / data.usd)).toFixed(2);
            }

            if (element.value === '') {
                targetElement1.value = '';
                targetElement2.value = '';
            }

        } catch (error) {
            console.error('Failed to fetch conversion data:', error);
        }
    }
}

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


// DRY - don't repeat yourself ( не повторяй самого себя )
// KISS - keep it super simple  - делай супер проще

//Card switcher

const card = document.querySelector('.card');
const prevButton = document.querySelector('#btn-prev');
const nextButton = document.querySelector('#btn-next');

let cardId = 1;

const updateCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();

        const { id, title, completed } = data;

        card.innerHTML = `
            <p>${title}</p>
            <p>Completed: ${completed}</p>
            <span>Card ID: ${id}</span>
        `;

        console.log(data.id, data.title, data.completed);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

updateCard(cardId);

updateCard(cardId);

nextButton.onclick = () => {
    cardId++;
    if (cardId > 200) cardId = 1;
    updateCard(cardId);
};

prevButton.onclick = () => {
    cardId--;
    if (cardId < 1) cardId = 200;
    updateCard(cardId);
};

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        console.log("Posts data:", posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

fetchPosts();

// weather

const searchInput = document.querySelector('.cityName');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

// query params - настройки запроса , свойства запроса

const  API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

searchInput.oninput = async () => {
    try {
        const response = await fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        city.innerHTML = data.name|| "City is not defined";
        temp.innerHTML = data.main?.temp? Math.round(data.main?.temp) + '&deg;C':"Темпаратура не определена"
    } catch(error) {
        console.log(error)
    }
}

// optional chaining
//?

// const object = {
//     address: {
//
//     }
// }
// console.log(object.address?.city)
