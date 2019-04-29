/*class SelectionElem extends HTMLElement {
    constructor(){
        super();

        const optionsWayFrom = ['Город отправления' , 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];
        const optionsWayTo = ['Выбрать пункт прибытия', 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];

        let wayFrom = document.createElement('div');
        wayFrom.className = 'way-from';

        let wayTo = document.createElement('div');
        wayTo.className = 'way-to';

        function createSelect(options , id , parentTag) {
            let sel = document.createElement('select');
            sel.id = id;

            parentTag === wayTo ? sel.style.display = 'none' : null;

            options.forEach ( val => {
                var opt = document.createElement( 'option' );
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
}*/



let createElem = (wrapTagName , tagName) => wrapTagName.appendChild( document.createElement ( tagName ) );
let defineElem = (nameElem , nameClass) => customElements.define( nameElem, nameClass );

let wrapper = document.querySelector('.wrapper');

class CaptionElem extends HTMLElement {
    constructor() {
        super ();
        this.shadow = this.attachShadow ( { mode: 'open' } );
        let caption = document.querySelector ( "#caption" );
        this.shadow.appendChild ( caption.content )
    }
}
defineElem('caption-elem', CaptionElem);
createElem(wrapper , 'caption-elem').style = `display: block`;

const options = ['Выберите город' , 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];

function createClassSelectionElem( textLabel , nameSelect , optionsArr , checkValue , nameTag ) {
    class SelectionElem extends HTMLElement {
        constructor () {
            super();
            this.shadow = this.attachShadow ( { mode: 'open' } );

            const style = `
                .wrap-way {
                    padding-bottom: 20px;
                }                
                .wrap-way label {
                    display: block;
                    padding-bottom: 10px;
                    font-size: 18px;
                    font-family: 'Roboto', sans-serif;
                    color: #656565;
                    font-weight: 700;
                }
                .wrap-way select {
                    display: block;
                    width: 100%;
                    height: 50px;
                    padding: 5px 5px 5px 10px;
                    background: #3ab1bf;
                    border: none;
                    outline: none;
                    color: #fff;
                    font-size: 15px;
                }
            `;

            this.shadow.appendChild(
                document.createElement('style')
            ).textContent = style;

            //optionsArr проверка на массив
            const options = optionsArr;

            let div = createElem(this.shadow , 'div');
            div.className = 'wrap-way';

            let label = createElem(div , 'label');
            label.textContent = textLabel;

            let select = createElem(div , 'select');
            select.name = nameSelect;

            options.forEach ( val => {
                let opt = document.createElement( 'option' );
                opt.innerHTML = val;
                opt.value = val;
                select.appendChild ( opt )
            });

            select.addEventListener('change' , checkValue);
        }
    }

    defineElem(nameTag, SelectionElem);
    createElem(wrapper , nameTag);
}

(function (){
    let valOne; 
    let getValSelectOne = function (e) {
        return valOne = e.target.value;
    };

    let checkValue = function (e) {
        console.log(valOne);
        console.log(e.target.value)
    }

    createClassSelectionElem( 'Откуда' , 'way-from' , options , getValSelectOne  , 'selection-from' );
    createClassSelectionElem( 'Куда' , 'way-to' , options ,checkValue  , 'selection-to' );
})();
