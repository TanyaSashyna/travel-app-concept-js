(function (){
    
    let createElem = (wrapTagName , tagName) => wrapTagName.appendChild( document.createElement ( tagName ) );
    let defineElem = (nameElem , nameClass) => customElements.define( nameElem, nameClass );
    let wrapper = document.querySelector('.wrapper');
    let valOne;

    //Подумать над решением выбора города.
    // Т.е если выбран "Х", то в селекте ""куда" будут все пункты кроме "Х".
    //Если это не "Х", то в селекте куда будет только пункт "Х".
    //Плюс подумать над появлением блока "куда"(должен появляться на странице только после выбора города "откуда")
    const options = ['Выберите город' , 'Харьков' , 'Железный Порт' , 'Скадовск' , 'Лазурное' , 'Одесса - Затока'];

    function createCaption () {
        class CaptionElem extends HTMLElement {
            constructor() {
                super ();
                this.shadow = this.attachShadow ( { mode: 'open' } );
                let caption = document.querySelector ( "#caption" );
                this.shadow.appendChild ( caption.content.cloneNode ( true ) )
            }
        }

        defineElem('caption-elem', CaptionElem);
        createElem(wrapper , 'caption-elem').style = `display: block`;
    }

    function createClassAboutWay (headCity) {
        class AboutWayElem extends HTMLElement {
            constructor () {
                super();
                this.shadow = this.attachShadow ( { mode: 'open' } );

                let aboutWay = document.querySelector ( "#about_way" );
                this.shadow.appendChild ( aboutWay.content.cloneNode ( true ) )

                /*let wayHead = this.shadow.querySelector('.way-head');
                wayHead.textContent = headCity;*/
            }
        }

        defineElem('about-way', AboutWayElem);
        createElem(wrapper , 'about-way').style = `display: block`;
    }

    function createClassSelectionElem( textLabel , nameSelect , checkValue = function(){} , nameTag ) {
        class SelectionElem extends HTMLElement {
            constructor() {
                super ();
                this.shadow = this.attachShadow ( { mode: 'open' } );

                let caption = document.querySelector ( "#selection" );
                this.shadow.appendChild ( caption.content.cloneNode ( true ) );

                let label = this.shadow.querySelector('label');
                    label.textContent = textLabel;

                let select = this.shadow.querySelector('select');
                select.name = nameSelect;

                select.addEventListener('change' , checkValue);
            }
        }
        defineElem(nameTag, SelectionElem);
        createElem(wrapper , nameTag).style.display = nameSelect === 'way-to' ? 'none' : 'block';
    }

    function addOptions(options , sel) {
        options.forEach ( val => {
            let opt = document.createElement( 'option' );
            opt.innerHTML = val;
            opt.value = val;
            sel.appendChild ( opt )
        })
    }

    function checkValue (e) {
        console.log(valOne);
        console.log(e.target.value);

        //document.querySelector('about-way') ? document.querySelector('about-way').remove() : null;

        //createClassAboutWay()
        //Подумать над удалением и вставкой повторяющегося template
        /*let cap = document.querySelector ( "#caption" );
        document.querySelector('.wrapper').appendChild(
            cap.content
        )*/
    }

    function checkCity (city) {
        let arr;
        return arr = city === 'Харьков' ? options.filter ( x => x !== 'Харьков' ) : ['Выберите город' , 'Харьков'];
    }

    function getValSelectOne (e) {
        valOne = e.target.value;

        document.querySelector('selection-to').shadowRoot.querySelector('select').innerHTML = '';

        let newOptions = checkCity(e.target.value);

        addOptions(newOptions , document.querySelector('selection-to').shadowRoot.querySelector('select') );

        document.querySelector('selection-to').style.display = 'block'
    }

    createCaption ();
    createClassSelectionElem( 'Откуда' , 'way-from' , getValSelectOne  , 'selection-from' );
    addOptions( options , document.querySelector('selection-from').shadowRoot.querySelector('select') );

    createClassSelectionElem( 'Куда' , 'way-to' ,checkValue  , 'selection-to' );
})();