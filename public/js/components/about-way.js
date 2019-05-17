function createClassAboutWay() {
    let btnOrder, btnBack;

    return class AboutWayElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.getElementById('about_way');
            this.shadow.appendChild(aboutWay.content.cloneNode(true));
        }

        connectedCallback() {
            btnBack = this.shadow.getElementById('back');
            btnBack.addEventListener('click' , this.backToTransfer);

            btnOrder = this.shadow.getElementById('buy-btn');
            btnOrder.addEventListener('click', this.createOrderSheet);

            fetch('http://localhost:3000/aboutWay')
                .then(resp => resp.json()
                    .then(
                        resp => {
                            for (let sites in resp) {
                                if (`${valOne} - ${valTwo}`.localeCompare(sites) === 0) {

                                    this.shadow.querySelector('.way-head')
                                        .textContent = sites;

                                    this.shadow.querySelector('.picture').src = resp[sites].picture;

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
            btnBack.removeEventListener('click', this.backToTransfer);
            btnOrder.removeEventListener('click', this.createOrderSheet)
        }

        createOrderSheet(e) {
            !document.querySelector('form-order') ?
                createElem(wrap, 'form-order') : null;
        }

        backToTransfer (e) {
            methodsLib.cleaningWrap();
            /*document.querySelector('about-way').remove();

            document.querySelector('form-order') ?
                document.querySelector('form-order').remove() : null;*/

            createDivFromTo();
        }
    }
}
defineElem('about-way', createClassAboutWay());