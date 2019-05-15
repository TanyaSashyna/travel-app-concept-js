function createClassSelectionElem(textLabel) {
    let select;

    return class SelectionElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});

            let selectTemplate = document.querySelector("#selection");
            this.shadow.appendChild(selectTemplate.content.cloneNode(true));
        }

        connectedCallback() {
            let label = this.shadow.querySelector('label');
            label.textContent = textLabel;

            select = this.shadow.querySelector('select');
            select.addEventListener(
                'change',
                textLabel === 'Откуда' ? this.getValSelectOne : this.checkValue
            );

            textLabel === 'Откуда' ?
                methodsLib.addOptions(options,this.shadow.querySelector('select')) : null
        }

        disconnectedCallback() {
            select.removeEventListener('change' ,
                textLabel === 'Откуда' ? this.getValSelectOne : this.checkValue
            )
        }

        getValSelectOne(e) {
            valOne = e.target.value;

            let selectTo = document.querySelector('selection-to')
                .shadowRoot.querySelector('select');
            selectTo.innerHTML = '';

            let newOptions = methodsLib.checkCity(e.target.value, 'Харьков');

            methodsLib.addOptions( newOptions, selectTo );

            document.querySelector('selection-to').style.display = 'block'
        }

        checkValue(e) {
            valTwo = e.target.value;

            document.querySelector('about-way') ?
                document.querySelector('about-way').remove() : null;

            document.querySelector('form-order') ?
                document.querySelector('form-order').remove() : null;

            createElem(wrap, 'about-way').style.display = 'block';

            document.querySelector('.from-to').remove();
            location.hash = 'booking';
        }
    }
}

defineElem('selection-from', createClassSelectionElem('Откуда'));
defineElem('selection-to', createClassSelectionElem('Куда'));