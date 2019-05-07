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
                //console.log(e.target.parentElement.parentElement);
                let objDataClient = {
                    fromTo : `${valOne} - ${valTwo}`,
                    firstName : objDateForSend.firstName,
                    lastName : objDateForSend.lastName,
                    phone : objDateForSend.phone
                };
                let formParent = e.target.parentElement.parentElement;


                let methodPost = function () {
                    fetch('http://localhost:3000/travelList',{
                        method: 'POST',
                        body: JSON.stringify({
                                [objDateForSend.date]: [objDataClient]
                            }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(resp => resp.json()
                            .then(resp => console.log(resp))
                    );
                };

                let methodPut = function (arr , ind) {
                    //проверить index
                    arr.push(objDataClient);
                    fetch(`http://localhost:3000/travelList/${ind+1}`,{
                        method: 'PUT',
                        body: JSON.stringify({
                            [objDateForSend.date]: arr
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(resp => resp.json()
                        .then(resp => console.log(resp))
                    );
                };

                if (checkRes) {

                    fetch('http://localhost:3000/travelList')
                        .then(resp => resp.json()
                            .then(resp => {
                                    //console.log(resp);

                                    if(resp.length === 0){
                                        console.log(resp);
                                        methodPost()
                                    } else {
                                        resp.forEach(
                                            (elem) => {
                                                //проверить index
                                                let arr = elem[objDateForSend.date];
                                                elem[objDateForSend.date] ? methodPut(arr) : methodPost()
                                            }
                                        )
                                    }
                                }
                            )
                        );

                    /*fetch('http://localhost:3000/travelList',{
                        method: 'POST',
                        body: JSON.stringify({
                                [objDateForSend.date]: [objDataClient]
                            }
                            ),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(resp => resp.json()
                        .then(resp => console.log(resp)),
                        err => console.log(err)
                    );*/

                    /*fetch('http://localhost:3000/travelList/1',{
                        method: 'PUT',
                        body: JSON.stringify({
                            [objDateForSend.date]: [objDataClient]
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(resp => resp.json()
                            .then(resp => console.log(resp))
                    );*/


                    //Не удалять!!!
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
                        console.log(objDateForSend , objDataClient);
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