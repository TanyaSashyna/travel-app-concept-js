let createElem = tagName => document.createElement ( tagName );

class WrapperElem extends HTMLElement {
    constructor() {
        super ();

        let wrapper = createElem('div');
        wrapper.className = "wrapper";
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