let bodyElem = document.body;
let createElem = tagName => document.createElement ( tagName );

let wrapper = createElem('div');
wrapper.style = `
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    background: #f5f5f5;
`;
bodyElem.appendChild(wrapper);


let h2Tag = createElem('h2');
h2Tag.textContent = 'Пассажирские перевозки';
h2Tag.style = `
    font-size: 25px;
    font-family: 'Roboto', sans-serif;
    color: #656565;
    font-weight: 700;
    text-align: center;
`;
wrapper.appendChild(h2Tag);


let pTag = createElem('p');
pTag.textContent = 'Автобусные пассажирские перевозки нашим комфортабельным автобусом доставят вам удовольствие от поездки. ';
pTag.style = `
    padding: 25px 0
    font-size: 17px;
    font-family: 'Roboto', sans-serif;
    color: #929191;
    text-align: justify;
`;
wrapper.appendChild(pTag);


class WrapperElem extends HTMLElement {
    constructor() {
        super ();

        let wrapper = createElem('div');
        //wrapper.className = 'wrapper';
        wrapper.textContent = 'Lorem ipsum';

        let style = createElem('style');

        style.textContent = `
            .wrapper {
                padding: 20px;
                border: 1px solid #ccc;
                background: #ddddee;
            }
        `;

        this.shadow = this.attachShadow ( { mode: 'open' } );
        this.shadow.appendChild ( style );
        this.shadow.appendChild ( wrapper );
    }
}

customElements.define ( 'wrapper-elem', WrapperElem );

document.body.appendChild(
    createElem('wrapper-elem')
);