let createElem = (wrapTagName, tagName) => wrapTagName.appendChild(document.createElement(tagName));
let defineElem = (nameElem, nameClass) => customElements.define(nameElem, nameClass);

let fromTo = document.querySelector('.from-to');
let routes = document.querySelector('.routes');
let record = document.querySelector('.record');
let valOne; //value select  "Откуда"
let valTwo; //value select  "Куда"
let checkRes; // var for validation
let objDateForSend = {}; //the object to send data to the server after filling out the form on the order

const options = ['Выберите город', 'Харьков', 'Кириловка', 'Скадовск', 'Лазурное'];