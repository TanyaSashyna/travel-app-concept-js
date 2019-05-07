function createClassAboutWay() {
    let btnOrder;
    let createOrderSheet;

    return class AboutWayElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.querySelector("#about_way");
            this.shadow.appendChild(aboutWay.content.cloneNode(true));

            createOrderSheet = function (e) {
                console.log('createOrderSheet');
                createElem(record, 'form-order').style = `display: block`;
            };

            btnOrder = this.shadow.querySelector('.buy-btn');
            btnOrder.addEventListener('click', createOrderSheet)
        }

        connectedCallback() {
            fetch('http://localhost:3000/aboutWay')
                .then(resp => resp.json()
                    .then(
                        resp => {
                            for (let sites in resp) {
                                if (`${valOne} - ${valTwo}`.localeCompare(sites) === 0) {
                                    //console.log(resp[sites]);

                                    this.shadow.querySelector('.way-head')
                                        .textContent = sites;

                                    this.shadow.querySelector('.picture').src = resp[sites].picture

                                    this.shadow.querySelector('.when')
                                        .textContent = resp[sites].when;

                                    this.shadow.querySelector('.time')
                                        .textContent = resp[sites].departureTime;

                                    this.shadow.querySelector('.where')
                                        .textContent = resp[sites].departurePoint;

                                    this.shadow.querySelector('.city-time')
                                        .textContent = `${resp[sites].placeArrival} ${resp[sites].arrivalTime}`;

                                    this.shadow.querySelector('.price')
                                        .textContent = `${resp[sites].cost} грн`
                                }
                            }
                        }
                    )
                )
        }

        disconnectedCallback() {
            btnOrder.removeEventListener('click', createOrderSheet);
            console.log('I am removed now')
        }
    }
}
defineElem('about-way', createClassAboutWay());