function createClassAboutWay() {
    let btnOrder;

    return class AboutWayElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let aboutWay = document.querySelector("#about_way");
            this.shadow.appendChild(aboutWay.content.cloneNode(true));

            btnOrder = this.shadow.querySelector('.buy-btn');
            btnOrder.addEventListener('click', createOrderSheet)
        }

        connectedCallback() {
            console.log(
                this.shadow.querySelector('.way-head'),
                this.shadow.querySelector('.picture').src,
                this.shadow.querySelector('.when'),
                this.shadow.querySelector('.time'),
                this.shadow.querySelector('.where'),
                this.shadow.querySelector('.city-time'),
                this.shadow.querySelector('.price'),
            )
        }

        disconnectedCallback() {
            btnOrder.removeEventListener('click', createOrderSheet);
            console.log('I am removed now')
        }
    }
}

defineElem('about-way', createClassAboutWay());

function createOrderSheet(e) {
    console.log('createOrderSheet');
    createElem(record, 'form-order').style = `display: block`;
}