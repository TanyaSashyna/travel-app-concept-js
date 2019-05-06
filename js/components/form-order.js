function createClassFormOrder() {
    let btnBuyTicket,
        inputsForm,
        sendingData;

    return class formOrder extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.querySelector("#form_order");
            this.shadow.appendChild(aboutWay.content.cloneNode(true));

            inputsForm = this.shadow.querySelectorAll('input');

            Array.from(inputsForm).forEach(
                elem => {
                    elem.addEventListener('change', methodsLib.checkInput)
                }
            );

            function sendingData(e) {
                //console.log('Ваши данные приняты');
                methodsLib.checkInput(e);
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

            btnBuyTicket = this.shadow.querySelector('.buy-ticket');
            btnBuyTicket.addEventListener('click', sendingData)
        }

        disconnectedCallback() {
            Array.from(inputsForm).forEach(
                elem => {
                    elem.removeEventListener('change', methodsLib.checkInput)
                }
            );
            btnBuyTicket.removeEventListener('click', sendingData);
            console.log('I am removed now')
        }
    }
}

defineElem('form-order', createClassFormOrder());