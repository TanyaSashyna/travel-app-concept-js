function createClassformOrder() {
    let btnBuyTicket, inputsForm;

    return class formOrder extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.querySelector("#form_order");
            this.shadow.appendChild(aboutWay.content.cloneNode(true));

            inputsForm = this.shadow.querySelectorAll('input');

            Array.from(inputsForm).forEach(
                elem => {
                    elem.addEventListener('change', getValue)
                }
            );

            btnBuyTicket = this.shadow.querySelector('.buy-ticket');
            btnBuyTicket.addEventListener('click', sendingData)
        }

        disconnectedCallback() {
            Array.from(inputsForm).forEach(
                elem => {
                    elem.removeEventListener('change', getValue)
                }
            );
            btnBuyTicket.removeEventListener('click', sendingData);
            console.log('I am removed now')
        }
    }
}

defineElem('form-order', createClassformOrder());

//EventListener
function getValue(e) {
    checkInput(e);
}

//EventListener
function sendingData(e) {
    //console.log('Ваши данные приняты');
    checkInput(e);
    console.log(objDateForSend);

    if (checkRes) {
        document.querySelector('.module').style.display = "block";
        document.body.classList.add('open-modal');

        setTimeout(() => {
            document.querySelector('.module').style.display = "none";
            document.body.classList.remove('open-modal');
            objDateForSend = {};
            console.log(objDateForSend);
        }, 5000)
    }
}

//Validation
function checkInput(e) {
    checkRes = true;
    Array.from(e.target.parentElement.parentElement)
        .filter(elem => elem.nodeName === 'INPUT')
        .forEach((elem, ind) => {

            let typeInput = elem.getAttribute('type');

            switch (typeInput) {
                case 'text':
                    let x = elem.value.search(/^[a-zA-Zа-яА-Я]+$/);
                    checkValidation(x, elem);
                    break;

                case 'phone':
                    let y = elem.value.search(/[0-9]/);
                    elem.value.length < 10 ? y = -1 : y;
                    checkValidation(y, elem);
                    break;

                case 'date':
                    let d = elem.value.search(/[0-9]/);
                    checkValidation(d, elem);
                    break;
            }
        });
    addAttrBtn(e)
}

function checkValidation(val, elem) {
    console.log(val);
    if (val !== 0) {
        checkRes = false;
        elem.nextElementSibling.style.display = 'block';

    } else if (val === 0) {
        elem.nextElementSibling.style.display = 'none';
        objDateForSend[elem.name] = elem.value;
    }
}

function addAttrBtn(e) {
    let btn = Array.from(e.target.parentElement.parentElement)
        .find(elem => elem.nodeName === 'BUTTON');
    console.log(checkRes);
    console.log(btn);
    checkRes === true ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', 'disabled');
}
//Validation