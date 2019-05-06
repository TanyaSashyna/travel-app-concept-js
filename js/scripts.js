let createElem = (wrapTagName, tagName) => wrapTagName.appendChild(document.createElement(tagName));
let defineElem = (nameElem, nameClass) => customElements.define(nameElem, nameClass);

let fromTo = document.querySelector('.from-to');
let routes = document.querySelector('.routes');
let record = document.querySelector('.record');
let valOne; //значение селекта  "Откуда"
let checkRes; // переменная для валидации
let objDateForSend = {}; //обьект для отправки данных на сервер после заполнения формы по заказу

const options = ['Выберите город', 'Харьков', 'Железный Порт', 'Скадовск', 'Лазурное', 'Одесса - Затока'];