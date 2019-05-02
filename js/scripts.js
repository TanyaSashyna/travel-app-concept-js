(function (){
    
    let createElem = (wrapTagName , tagName) => wrapTagName.appendChild( document.createElement ( tagName ) );
    let defineElem = (nameElem , nameClass) => customElements.define( nameElem, nameClass );
    let fromTo = document.querySelector('.from-to');
    let routes = document.querySelector('.routes');
    let record = document.querySelector('.record');
    let valOne;
    let objDateForSend = {}; //обьект для отправки данных на сервер после заполнения формы по заказу

    //перенести создание классов в одну функцию по созданию класа

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
        createElem(fromTo , 'caption-elem').style = `
            display: flex;
            align-items: center;
        `;
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
        createElem(fromTo , nameTag).style = `
            display: ${nameSelect === 'way-to' ? 'none' : 'block'};
            width: 50%;
        `;
    }
    //--------------------------------------------------------------------------


    function createClassAboutWay () {
        let btnOrder;

        return class AboutWayElem extends HTMLElement {
            constructor () {
                super();
                this.shadow = this.attachShadow ( { mode: 'open' } );
                let aboutWay = document.querySelector ( "#about_way" );
                this.shadow.appendChild ( aboutWay.content.cloneNode ( true ) )

                btnOrder = this.shadow.querySelector('.buy-btn');
                btnOrder.addEventListener('click' , createOrderSheet)
            }
            connectedCallback() {
                console.log(
                    this.shadow.querySelector('.way-head') ,
                    this.shadow.querySelector('.picture').src ,
                    this.shadow.querySelector('.when') , 
                    this.shadow.querySelector('.time') , 
                    this.shadow.querySelector('.where') ,
                    this.shadow.querySelector('.city-time') ,
                    this.shadow.querySelector('.price') ,
                )
            }
            disconnectedCallback() {
                console.log('I am removed now');
                btnOrder.removeEventListener('click' , createOrderSheet)
            }
        }
    }
    defineElem('about-way', createClassAboutWay());


    function createClassformOrder() {
        let btnBuyTicket;
        //обработчик события на инпутах
        //проверка инпутов перед отправкой формы

        return class formOrder extends HTMLElement {
            constructor() {
                super()
                this.shadow = this.attachShadow ( { mode: 'open' } );
                let aboutWay = document.querySelector ( "#form_order" );
                this.shadow.appendChild ( aboutWay.content.cloneNode ( true ) )

                btnBuyTicket = this.shadow.querySelector('.buy-ticket');
                btnBuyTicket.addEventListener('click' , sendingData)
            }
            disconnectedCallback() {
                console.log('I am removed now');
                btnBuyTicket.removeEventListener('click' , sendingData)
            }
        }
    }
    defineElem('form-order', createClassformOrder());

    //----------------------------------------------------------------------------

    function addOptions(options , sel) {
        options.forEach ( val => {
            let opt = document.createElement( 'option' );
            opt.innerHTML = val;
            opt.value = val;
            sel.appendChild ( opt )
        })
    }

    function checkCity (city) {
        let arr;
        return arr = city === 'Харьков' ? options.filter ( x => x !== 'Харьков' ) : ['Выберите город' , 'Харьков'];
    }

    //EventListener
    function getValSelectOne (e) {
        valOne = e.target.value;

        document.querySelector('selection-to').shadowRoot.querySelector('select').innerHTML = '';

        let newOptions = checkCity(e.target.value);

        addOptions(newOptions , document.querySelector('selection-to').shadowRoot.querySelector('select') );

        document.querySelector('selection-to').style.display = 'block'
    }

    //EventListener
    function checkValue (e) {
        console.log(valOne);
        console.log(e.target.value);

        document.querySelector('about-way') ? document.querySelector('about-way').remove() : null;
        document.querySelector('form-order') ? document.querySelector('form-order').remove() : null;

        createElem(routes , 'about-way').style = `display: block`;
    }

    //EventListener
    function createOrderSheet(e) {
        console.log('createOrderSheet');
        createElem(record , 'form-order').style = `display: block`;
    }

    function sendingData(e) {
        console.log('Ваши данные приняты');

        document.querySelector('.module').style.display="block";
        document.body.classList.add('open-modal')

        setTimeout(()=>{
            document.querySelector('.module').style.display="none";
            document.body.classList.remove('open-modal')
        } , 5000)
    }


    //--------------------------------------------------------------------------------------------------
    createCaption ();
    createClassSelectionElem( 'Откуда' , 'way-from' , getValSelectOne  , 'selection-from' );
    addOptions( options , document.querySelector('selection-from').shadowRoot.querySelector('select') );

    createClassSelectionElem( 'Куда' , 'way-to' ,checkValue  , 'selection-to' );
})();