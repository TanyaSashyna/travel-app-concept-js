function createCaption() {
    return class CaptionElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let caption = document.getElementById('caption');
            this.shadow.appendChild(caption.content.cloneNode(true))
        }
    }
}

defineElem('caption-elem', createCaption());