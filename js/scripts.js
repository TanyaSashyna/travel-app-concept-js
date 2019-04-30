(function (){
    
    let createElem = (wrapTagName , tagName) => wrapTagName.appendChild( document.createElement ( tagName ) );
    let defineElem = (nameElem , nameClass) => customElements.define( nameElem, nameClass );
    let wrapper = document.querySelector('.wrapper');
    let valOne;

    //Подумать над решением выбора города.
    // Т.е если выбран "Х", то в селекте куда будут все пункты кроме "Х".
    //Если это не "Х", то в селекте куда будет только пункт "Х".
    //Плюс подумать над появлением блока "куда"(должен добавляться на страницу только после выбора города "откуда")
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

    function createClassAboutWay () {
        class AboutWayElem extends HTMLElement {
            constructor () {
                super();
                this.shadow = this.attachShadow ( { mode: 'open' } );

                let aboutWay = document.querySelector ( "#about_way" );
                this.shadow.appendChild ( aboutWay.content.cloneNode ( true ) )
            }
        }

        defineElem('about-way', AboutWayElem);
        createElem(wrapper , 'about-way').style = `display: block`;
    }

    function getValSelectOne (e) {
        return valOne = e.target.value;
    }

    function checkValue (e) {
        console.log(valOne);
        console.log(e.target.value);
        createClassAboutWay ()
    }

    function createClassSelectionElem( textLabel , nameSelect , optionsArr = ['Выберите город'] , checkValue = function(){} , nameTag ) {
        class SelectionElem extends HTMLElement {
            constructor() {
                super ();

                const options = optionsArr;
                this.shadow = this.attachShadow ( { mode: 'open' } );

                let caption = document.querySelector ( "#selection" );
                this.shadow.appendChild ( caption.content.cloneNode ( true ) );

                let label = this.shadow.querySelector('label');
                    label.textContent = textLabel;

                let select = this.shadow.querySelector('select');
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

    createCaption ();
    createClassSelectionElem( 'Откуда' , 'way-from' , options , getValSelectOne  , 'selection-from' );
    createClassSelectionElem( 'Куда' , 'way-to' , options ,checkValue  , 'selection-to' );

})();