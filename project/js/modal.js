const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const closeItem = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    window.removeEventListener('scroll', checkScrollPosition); 
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

modalTrigger.onclick = () => openModal();

closeItem.onclick = () => closeModal();

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

const checkScrollPosition = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        openModal();
    }
};

window.addEventListener('scroll', checkScrollPosition);

setTimeout(openModal, 10000);

//POST DATA

const form = document.querySelector('form');

const chat_id = '@alibet_lesson7'
const token = '7766228682:AAH0emHdl0ucsJqsEriLPvKJeK8dXS9Mytw'
const api_url = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const user = {};
    formData.forEach((item, index) => {
        user[index] = item;
    });

    const { name, phone } = user;
    const text = `name: ${name}\nphone: ${phone}`;

    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chat_id, text })
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        console.log("Данные успешно отправлены");
    } catch (error) {
        console.error("Произошла ошибка при отправке данных:", error);
    }
};

// const object = {}
// object.name = 'John'
// console.log(object.name)
