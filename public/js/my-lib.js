const methodsLib = {
    cleaningWrap : function () {
        wrap.innerHTML !== "" ? wrap.innerHTML = '' : null
    },

    createPage: function ( collectionElem , newTagName) {
        if(collectionElem.constructor.name === 'HTMLCollection') {
            Array.from(collectionElem).forEach(
                elem => elem.addEventListener('click' , function (e) {
                    e.preventDefault();
                    location.hash = this.getAttribute('href');
                    methodsLib.cleaningWrap();
                    createElem(wrap , newTagName)
                })
            )
        }
    },

    addOptions: function (options, sel) {
        Array.isArray(options) ?
            options.forEach(val => {
                let opt = document.createElement('option');
                opt.innerHTML = val;
                opt.value = val;
                sel.appendChild(opt)
            }) : null
    },

    checkCity: function (selectedCity, city) {
        let arr;
        return arr = selectedCity === city || selectedCity === 'Выберите город' ?
            options.filter(x => x !== city) :
            ['Выберите город', city];
    },

    checkValidation: function (val, elem) {
        if (val !== 0) {
            checkRes = false;
            elem.nextElementSibling.style.display = 'block';

        } else if (val === 0) {
            elem.nextElementSibling.style.display = 'none';
            objDateForSend[elem.name] = elem.value;
        }
    },

    addAttrBtn: function (e) {
        let btn = Array.from(e.target.parentElement.parentElement)
            .find(elem => elem.nodeName === 'BUTTON');

        checkRes === true ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', 'disabled');
    },

    checkInput: function (e) {
        checkRes = true;

        Array.from(e.target.parentElement.parentElement)
            .filter(elem => elem.nodeName === 'INPUT')
            .forEach(elem => {
                let typeInput = elem.getAttribute('name');

                switch (typeInput) {
                    case 'firstName':
                        let f = elem.value.search(regArr[0]);
                        methodsLib.checkValidation(f, elem);
                        break;

                    case 'lastName' :
                        let l = elem.value.search(regArr[0]);
                        methodsLib.checkValidation(l, elem);
                        break;

                    case 'city' :
                        let c = elem.value.search(regArr[0]);
                        methodsLib.checkValidation(c, elem);
                        break;

                    case 'phone':
                        let y = elem.value.search(regArr[1]);
                        methodsLib.checkValidation(y, elem);
                        break;

                    case 'date':
                        let d = elem.value.search(regArr[2]);
                        methodsLib.checkValidation(d, elem);
                        break;

                    case 'number':
                        let n = elem.value.search(regArr[2]);
                        elem.value <= 0 ? n = -1 : n;
                        methodsLib.checkValidation(n, elem);
                        break;
                }
            });
        methodsLib.addAttrBtn(e)
    },

    checkTravelList: function (dateKey, objDataClient) {
        fetch('http://localhost:3000/travelList')
            .then(resp => resp.json()
                .then(resp => {
                        resp.length === 0 ?
                            this.methodPost(dateKey, objDataClient) :
                            this.checkTravelObj(resp, dateKey, objDataClient)
                    }
                )
            );
    },

    methodPost: function (dateKey, objDataClient) {
        fetch('http://localhost:3000/travelList', {
            method: 'POST',
            body: JSON.stringify({
                [dateKey]: [objDataClient]
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    },

    methodPut: function (dataKey, objDataClient, arr, id) {
        arr.push(objDataClient);

        fetch(`http://localhost:3000/travelList/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                [dataKey]: arr
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    },

    checkTravelObj: function (resp, dateKey, objDataClient) {
        let travelObj = resp.find(
            function (elem) {
                return dateKey in elem
            }
        );
        travelObj ?
            this.methodPut(
                dateKey,
                objDataClient,
                travelObj[dateKey],
                travelObj.id
            ) :
            this.methodPost(dateKey, objDataClient)
    },

    getCookie: function () {
        return Object.assign( {} ,
            ...document.cookie.split('; ').map(
                str => {
                    return {
                        [str.split('=')[0]] : str.split('=')[1]
                    }
                }
            )
        )
    }
};