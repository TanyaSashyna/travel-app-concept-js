function createCaption() {
    return class CaptionElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let caption = document.querySelector("#caption");
            this.shadow.appendChild(caption.content.cloneNode(true))
        }
    }
}

defineElem('caption-elem', createCaption());
createElem(fromTo, 'caption-elem')
    .style = `
        display: flex;
        align-items: center;
    `;