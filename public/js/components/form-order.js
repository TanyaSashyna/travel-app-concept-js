function createClassFormOrder() {
    let btnBuyTicket,
        inputsForm;

    return class FormOrder extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.getElementById('form_order');
            this.shadow.appendChild(aboutWay.content.cloneNode(true))
        }

        connectedCallback() {
            inputsForm = this.shadow.querySelectorAll('input');

            Array.from(inputsForm).forEach(
                (elem , ind) => {
                    elem.name === ['firstName', 'lastName' , 'phone'][ind] ? elem.value = userData[elem.name] : null;

                    elem.addEventListener('change', methodsLib.checkInput);
                    elem.addEventListener('keyup' , methodsLib.checkInput)
                }
            );

            btnBuyTicket = this.shadow.getElementById('buy-ticket');
            btnBuyTicket.addEventListener('click', this.sendingData)
        }

        sendingData(e) {
            methodsLib.checkInput(e);

            let objDataClient = {
                fromTo : `${valOne} - ${valTwo}`,
                firstName : objDateForSend.firstName,
                lastName : objDateForSend.lastName,
                phone : objDateForSend.phone,
                numberOfSeats :objDateForSend.number
            };

            let formParent = e.target.parentElement.parentElement;

            if (checkRes) {
                methodsLib.checkTravelList(objDateForSend.date , objDataClient);

                document.querySelector('.module').style.display = "block";
                document.body.classList.add('open-modal');

                setTimeout(() => {
                    document.querySelector('.module').style.display = "none";
                    document.body.classList.remove('open-modal');

                    objDateForSend = {};
                    objDataClient ={};

                    methodsLib.cleaningWrap();
                    createDivFromTo();
                }, 3000)
            }
        }

        disconnectedCallback() {
            Array.from(inputsForm).forEach(
                elem => {
                    elem.removeEventListener('change', methodsLib.checkInput);
                    elem.removeEventListener('keyup' , methodsLib.checkInput)
                }
            );
            btnBuyTicket.removeEventListener('click', this.sendingData);
        }
    }
}

defineElem('form-order', createClassFormOrder());