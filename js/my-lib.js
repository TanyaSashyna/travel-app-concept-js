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

    checkCity: function (selectedCity , city) {
        let arr;
        return arr = selectedCity === city || selectedCity === 'Выберите город' ?
            options.filter(x => x !== city) :
            ['Выберите город', city];
    },

    checkValidation: function (val, elem){
        console.log(val);
        if (val !== 0) {
            checkRes = false;
            elem.nextElementSibling.style.display = 'block';

        } else if (val === 0) {
            elem.nextElementSibling.style.display = 'none';
            objDateForSend[elem.name] = elem.value;
        }
    },

    addAttrBtn: function (e){
        let btn = Array.from(e.target.parentElement.parentElement)
            .find(elem => elem.nodeName === 'BUTTON');
        console.log(checkRes);
        console.log(btn);
        checkRes === true ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', 'disabled');
    },

    checkInput: function(e) {
        checkRes = true;
        Array.from(e.target.parentElement.parentElement)
            .filter(elem => elem.nodeName === 'INPUT')
            .forEach((elem, ind) => {

                let typeInput = elem.getAttribute('type');

                switch (typeInput) {
                    case 'text':
                        let x = elem.value.search(/^[a-zA-Zа-яА-Я]+$/);
                        methodsLib.checkValidation(x, elem);
                        break;

                    case 'phone':
                        let y = elem.value.search(/[0-9]/);
                        elem.value.length < 10 ? y = -1 : y;
                        methodsLib.checkValidation(y, elem);
                        break;

                    case 'date':
                        let d = elem.value.search(/[0-9]/);
                        methodsLib.checkValidation(d, elem);
                        break;
                }
            });
        methodsLib.addAttrBtn(e)
    }
};