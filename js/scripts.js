let createElem = tagName => document.createElement ( tagName );
let defineElem = (nameElem , nameClass) => customElements.define ( nameElem, nameClass );

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
document.body.appendChild(wrapper);


class CaptionElem extends HTMLElement {
    constructor() {
        super ();

        let caption = createElem('div');
        caption.className = 'caption-wrap';

        let h2Tag = createElem('h2');
        h2Tag.textContent = 'Пассажирские перевозки';
        h2Tag.className = 'caption';

        let pTag = createElem('p');
        pTag.textContent = 'Автобусные пассажирские перевозки нашим комфортабельным автобусом доставят вам удовольствие от поездки. ';
        pTag.className = 'legend';

        let style = createElem('style');

        style.textContent = `
            .caption-wrap {
                margin-bottom: 30px;
            }
            .caption {
                font-size: 25px;
                font-family: 'Roboto', sans-serif;
                color: #656565;
                font-weight: 700;
                text-align: center;
            }
            .legend {
                padding: 25px 0
                font-size: 17px;
                font-family: 'Roboto', sans-serif;
                color: #929191;
                text-align: justify;
            }
        `;

        caption.appendChild(h2Tag);
        caption.appendChild(pTag);

        this.shadow = this.attachShadow ( { mode: 'open' } );
        this.shadow.appendChild ( style );
        this.shadow.appendChild ( caption );
    }
}

defineElem('caption-elem', CaptionElem);

wrapper.appendChild(
    createElem('caption-elem')
).style = `display: block`;


class SelectionElem extends HTMLElement {
    constructor(){
        super();

        const optionsWayFrom = ['Город отправления' , 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];
        const optionsWayTo = ['Выбрать пункт прибытия', 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];

        let wayFrom = createElem('div');
        wayFrom.className = 'way-from';

        let wayTo = createElem('div');
        wayTo.className = 'way-to';

        function createSelect(options , id , parentTag) {
            let sel = createElem('select');
            sel.id = id;

            parentTag === wayTo ? sel.style.display = 'none' : null;

            options.forEach ( val => {
                var opt = createElem( 'option' );
                opt.innerHTML = val;
                opt.value = val;
                sel.appendChild ( opt )
            });

            parentTag.appendChild( sel );
            return  parentTag
        }

        this.shadow = this.attachShadow ( { mode: 'open' } );

        this.shadow.appendChild ( createSelect(optionsWayFrom , 'way_from' , wayFrom) );
        this.shadow.appendChild ( createSelect(optionsWayTo , 'way_to', wayTo) );
    }
}

defineElem('selection-elem', SelectionElem);

wrapper.appendChild(
    createElem('selection-elem')
).style = `display: block`;


let selectWayFrom = document.querySelector('selection-elem').shadowRoot.getElementById('way_from');

let checkValue = function (e) {
    console.log(e.target.value)
};

selectWayFrom.addEventListener('change' , checkValue);