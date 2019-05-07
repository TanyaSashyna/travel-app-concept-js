function createClassSelectionElem(textLabel) {
    let select;

    function getValSelectOne(e) {
        valOne = e.target.value;
        console.log(valOne);

        document.querySelector('selection-to').shadowRoot.querySelector('select').innerHTML = '';
        let newOptions = methodsLib.checkCity(e.target.value, 'Харьков');

        methodsLib.addOptions(
            newOptions,
            document.querySelector('selection-to').shadowRoot.querySelector('select')
        );

        document.querySelector('selection-to').style.display = 'block'
    }

    function checkValue(e) {
        valTwo = e.target.value;
        console.log(valTwo);
        //valOne;
        document.querySelector('about-way') ?
            document.querySelector('about-way').remove() : null;

        document.querySelector('form-order') ?
            document.querySelector('form-order').remove() : null;

        createElem(routes, 'about-way').style.display = 'block';
    }

    return class SelectionElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});

            let caption = document.querySelector("#selection");
            this.shadow.appendChild(caption.content.cloneNode(true));

            let label = this.shadow.querySelector('label');
            label.textContent = textLabel;

            select = this.shadow.querySelector('select');
            select.addEventListener(
                'change',
                textLabel === 'Откуда' ? getValSelectOne : checkValue
            );
        }

        disconnectedCallback() {
            select.removeEventListener(
                textLabel === 'Откуда' ? getValSelectOne : checkValue
            );
            console.log('I am removed checkValue now')
        }
    }
}

defineElem('selection-from', createClassSelectionElem('Откуда'));
defineElem('selection-to', createClassSelectionElem('Куда'));

createElem(fromTo, 'selection-from').style.width = '50%';
methodsLib.addOptions(
    options,
    document.querySelector('selection-from').shadowRoot.querySelector('select')
);

createElem(fromTo, 'selection-to')
    .style = `
        display: none;
        width: 50%;
    `;