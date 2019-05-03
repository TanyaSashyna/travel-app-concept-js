(function () {
    let createElem = (wrapTagName, tagName) => wrapTagName.appendChild(document.createElement(tagName));
    let defineElem = (nameElem, nameClass) => customElements.define(nameElem, nameClass);
    let fromTo = document.querySelector('.from-to');
    let routes = document.querySelector('.routes');
    let record = document.querySelector('.record');
    let valOne; //значение селекта  "Откуда"
    let checkRes; // переменная для валидации
    let objDateForSend = {}; //обьект для отправки данных на сервер после заполнения формы по заказу

    //перенести создание классов в одну функцию по созданию класа
    
    const options = ['Выберите город', 'Харьков', 'Железный Порт', 'Скадовск', 'Лазурное', 'Одесса - Затока'];

    function createCaption() {
        class CaptionElem extends HTMLElement {
            constructor() {
                super();
                this.shadow = this.attachShadow({mode: 'open'});
                let caption = document.querySelector("#caption");
                this.shadow.appendChild(caption.content.cloneNode(true))
            }
        }

        defineElem('caption-elem', CaptionElem);
        createElem(fromTo, 'caption-elem').style = `
            display: flex;
            align-items: center;
        `;
    }

    function createClassSelectionElem(textLabel, nameSelect, checkValue = function () {
    }, nameTag) {
        class SelectionElem extends HTMLElement {
            constructor() {
                super();
                this.shadow = this.attachShadow({mode: 'open'});

                let caption = document.querySelector("#selection");
                this.shadow.appendChild(caption.content.cloneNode(true));

                let label = this.shadow.querySelector('label');
                label.textContent = textLabel;

                let select = this.shadow.querySelector('select');
                select.name = nameSelect;

                select.addEventListener('change', checkValue);
            }
        }

        defineElem(nameTag, SelectionElem);
        createElem(fromTo, nameTag).style = `
            display: ${nameSelect === 'way-to' ? 'none' : 'block'};
            width: 50%;
        `;
    }

    //--------------------------------------------------------------------------


    function createClassAboutWay() {
        let btnOrder;

        return class AboutWayElem extends HTMLElement {
            constructor() {
                super();
                this.shadow = this.attachShadow({mode: 'open'});
                let aboutWay = document.querySelector("#about_way");
                this.shadow.appendChild(aboutWay.content.cloneNode(true));

                btnOrder = this.shadow.querySelector('.buy-btn');
                btnOrder.addEventListener('click', createOrderSheet)
            }

            connectedCallback() {
                console.log(
                    this.shadow.querySelector('.way-head'),
                    this.shadow.querySelector('.picture').src,
                    this.shadow.querySelector('.when'),
                    this.shadow.querySelector('.time'),
                    this.shadow.querySelector('.where'),
                    this.shadow.querySelector('.city-time'),
                    this.shadow.querySelector('.price'),
                )
            }

            disconnectedCallback() {
                console.log('I am removed now');
                btnOrder.removeEventListener('click', createOrderSheet)
            }
        }
    }

    defineElem('about-way', createClassAboutWay());


    function createClassformOrder() {
        let btnBuyTicket, inputsForm;

        return class formOrder extends HTMLElement {
            constructor() {
                super();
                this.shadow = this.attachShadow({mode: 'open'});
                let aboutWay = document.querySelector("#form_order");
                this.shadow.appendChild(aboutWay.content.cloneNode(true));

                inputsForm = this.shadow.querySelectorAll('input');

                Array.from(inputsForm).forEach(
                    elem => {
                        elem.addEventListener('change', getValue)
                    }
                );

                btnBuyTicket = this.shadow.querySelector('.buy-ticket');
                btnBuyTicket.addEventListener('click', sendingData)
            }

            disconnectedCallback() {
                console.log('I am removed now');
                btnBuyTicket.removeEventListener('click', sendingData);
                inputsForm.removeEventListener('click', getValue)
            }
        }
    }

    defineElem('form-order', createClassformOrder());

    //----------------------------------------------------------------------------

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
        return arr = city === 'Харьков' ? options.filter(x => x !== 'Харьков') : ['Выберите город', 'Харьков'];
    }

    //EventListener
    function getValSelectOne(e) {
        valOne = e.target.value;

        document.querySelector('selection-to').shadowRoot.querySelector('select').innerHTML = '';

        let newOptions = checkCity(e.target.value);

        addOptions(newOptions, document.querySelector('selection-to').shadowRoot.querySelector('select'));

        document.querySelector('selection-to').style.display = 'block'
    }

    //EventListener
    function checkValue(e) {
        console.log(valOne);
        console.log(e.target.value);

        document.querySelector('about-way') ? document.querySelector('about-way').remove() : null;
        document.querySelector('form-order') ? document.querySelector('form-order').remove() : null;

        createElem(routes, 'about-way').style = `display: block`;
    }

    //EventListener
    function createOrderSheet(e) {
        console.log('createOrderSheet');
        createElem(record, 'form-order').style = `display: block`;
    }


    //Validation
    function checkInput(e) {
        checkRes = true;
        Array.from(e.target.parentElement.parentElement)
            .filter(elem => elem.nodeName === 'INPUT')
            .forEach((elem, ind) => {

                let typeInput = elem.getAttribute('type');

                switch (typeInput) {
                    case 'text':
                        let x = elem.value.search(/^[a-zA-Zа-яА-Я]+$/);
                        checkValidation(x, elem);
                        break;

                    case 'phone':
                        let y = elem.value.search(/[0-9]/);
                        elem.value.length < 10 ? y = -1 : y;
                        checkValidation(y, elem);
                        break;

                    case 'date':
                        let d = elem.value.search(/[0-9]/);
                        checkValidation(d, elem);
                        break;
                }
            });
        addAttrBtn(e)
    }

    function checkValidation(val, elem) {
        console.log(val);
        if (val !== 0) {
            checkRes = false;
            //добавить спаны с текстом ошибок для инпутов
            // и вешать на них display: block, если значение не валидное
            //$(item).addClass('error');
            console.log('error')

        } else if (val === 0) {
            console.log('good');
            objDateForSend[elem.name] = elem.value;
            //$(item).removeClass('error');
            //вешать на спаны display: none, если значение валидное
        }
    }

    function addAttrBtn(e) {
        let btn = Array.from(e.target.parentElement.parentElement)
            .find(elem => elem.nodeName === 'BUTTON');
        console.log(checkRes);
        console.log(btn);
        checkRes === true ? btn.removeAttribute('disabled') : btn.setAttribute('disabled' , 'disabled');
    }
    //Validation

    //EventListener
    function getValue(e) {
        checkInput(e);
        //checkInput(e);
        //objDateForSend[e.target.name] = e.target.value;

        //checkInput(e) ? objDateForSend[e.target.name] = e.target.value : console.log('error');
    }

    //EventListener
    function sendingData(e) {
        //console.log('Ваши данные приняты');
        checkInput(e);
        console.log(objDateForSend);

        if(checkRes) {
            document.querySelector('.module').style.display = "block";
            document.body.classList.add('open-modal');

            setTimeout(() => {
                document.querySelector('.module').style.display = "none";
                document.body.classList.remove('open-modal');
                objDateForSend = {};
                console.log(objDateForSend);
            }, 5000)
        }
    }


    //--------------------------------------------------------------------------------------------------
    createCaption();
    createClassSelectionElem('Откуда', 'way-from', getValSelectOne, 'selection-from');
    addOptions(options, document.querySelector('selection-from').shadowRoot.querySelector('select'));

    createClassSelectionElem('Куда', 'way-to', checkValue, 'selection-to');
})();