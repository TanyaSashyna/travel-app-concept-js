function createClassSelectionElem(textLabel, checkValue = function(){}) {
    return class SelectionElem extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});

            let caption = document.querySelector("#selection");
            this.shadow.appendChild(caption.content.cloneNode(true));

            let label = this.shadow.querySelector('label');
            label.textContent = textLabel;

            let select = this.shadow.querySelector('select');
            select.addEventListener('change', checkValue);
        }
    }
}

defineElem('selection-from', createClassSelectionElem('Откуда', getValSelectOne));
defineElem('selection-to', createClassSelectionElem('Куда', checkValue));

function addOptions(options, sel) {
    options.forEach(val => {
        let opt = document.createElement('option');
        opt.innerHTML = val;
        opt.value = val;
        sel.appendChild(opt)
    })
}

function checkCity(city) {
    let arr;
    return arr = city === 'Харьков' ?
        options.filter(x => x !== 'Харьков') :
        ['Выберите город', 'Харьков'];
}

function getValSelectOne(e) {
    valOne = e.target.value;

    document.querySelector('selection-to').shadowRoot.querySelector('select').innerHTML = '';

    let newOptions = checkCity(e.target.value);

    addOptions(
        newOptions,
        document.querySelector('selection-to').shadowRoot.querySelector('select')
    );

    document.querySelector('selection-to').style.display = 'block'
}

function checkValue(e) {
    console.log(valOne);
    console.log(e.target.value);

    document.querySelector('about-way') ? document.querySelector('about-way').remove() : null;
    document.querySelector('form-order') ? document.querySelector('form-order').remove() : null;

    createElem(routes, 'about-way').style = `display: block`;
}

createElem(fromTo, 'selection-from').style.width = '50%';
addOptions(options, document.querySelector('selection-from').shadowRoot.querySelector('select'));

createElem(fromTo, 'selection-to')
    .style = `
        display: none;
        width: 50%;
    `;