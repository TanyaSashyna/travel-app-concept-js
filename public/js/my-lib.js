const methodsLib = {
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
                        let f = elem.value.search(/^[a-zA-Zа-яА-Я]+$/);
                        methodsLib.checkValidation(f, elem);
                        break;

                    case 'lastName' :
                        let l = elem.value.search(/^[a-zA-Zа-яА-Я]+$/);
                        methodsLib.checkValidation(l, elem);
                        break;

                    case 'phone':
                        let y = elem.value.search(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
                        methodsLib.checkValidation(y, elem);
                        break;

                    case 'date':
                        let d = elem.value.search(/[0-9]/);
                        methodsLib.checkValidation(d, elem);
                        break;

                    case 'number':
                        let n = elem.value.search(/[0-9]/);
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
    }
};