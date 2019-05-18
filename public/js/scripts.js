const wrap = document.querySelector('.wrapper');
const btnProfile = document.getElementsByClassName('profile');
const intercityLink = document.getElementById('intercity');
const btnSettings = document.getElementsByClassName('settings');
const avaSidebar = document.querySelector('.avatar');
const userName = document.querySelector('.userName');

let valOne; //value select  "Откуда"
let valTwo; //value select  "Куда"
let checkRes; // var for validation
let objDateForSend = {}; //the object to send data to the server after filling out the form on the order
let userData;

const options = ['Выберите город', 'Харьков', 'Кириловка', 'Скадовск', 'Лазурное'];
const regArr = [
    /^[a-zA-Zа-яА-Я]+$/ ,
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ ,
    /[0-9]/
];

const createElem = (wrapTagName, tagName) => wrapTagName.appendChild(document.createElement(tagName));
const defineElem = (nameElem, nameClass) => customElements.define(nameElem, nameClass);


//пока нет регистрации и логина писать в куки так:
//document.cookie = 'firstName=Petya';

window.onload = function (e){
    fetch('http://localhost:3000/users')
        .then(
            resp => resp.json()
                .then(
                    resp => {
                        userData = resp.find(
                            user => user.firstName === methodsLib.getCookie().firstName
                        );

                        userData.imgSrc ? avaSidebar.style.backgroundImage = `url(${atob(userData.imgSrc)})` : null;
                        userName.textContent = `${userData.firstName} ${userData.lastName}`;
                    }
                )
        );
    createDivFromTo();
};