function createClassFormOrder() {
    let btnBuyTicket,
        inputsForm;

    return class formOrder extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.getElementById('form_order');
            this.shadow.appendChild(aboutWay.content.cloneNode(true))
        }

        connectedCallback() {
            inputsForm = this.shadow.querySelectorAll('input');

            Array.from(inputsForm).forEach(
                elem => {
                    elem.addEventListener('change', methodsLib.checkInput)
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
                phone : objDateForSend.phone
            };
            let formParent = e.target.parentElement.parentElement;

            if (checkRes) {
                methodsLib.checkTravelList(objDateForSend.date , objDataClient);

                document.querySelector('.module').style.display = "block";
                document.body.classList.add('open-modal');

                setTimeout(() => {
                    document.querySelector('.module').style.display = "none";
                    document.body.classList.remove('open-modal');

                    Array.from(formParent)
                        .filter(elem => elem.nodeName === 'INPUT')
                        .forEach(elem => elem.value = '');

                    objDateForSend = {};
                    objDataClient ={};

                    document.querySelector('about-way').remove();
                    document.querySelector('form-order').remove();
                    createDivFromTo();
                }, 3000)
            }
        }

        disconnectedCallback() {
            Array.from(inputsForm).forEach(
                elem => {
                    elem.removeEventListener('change', methodsLib.checkInput)
                }
            );
            btnBuyTicket.removeEventListener('click', this.sendingData);
        }
    }
}

defineElem('form-order', createClassFormOrder());