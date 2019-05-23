function createSettings () {
    let avatarImg,
        avatarFile,
        inputsForm,
        btnSave;
    let fileReader = new FileReader ();

    return class Settings extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let settings = document.getElementById('settings-page');
            this.shadow.appendChild(settings.content.cloneNode(true))
        }

        connectedCallback() {
            location.hash = 'settings';

            avatarImg = this.shadow.getElementById('avatar-img');
            userData.imgSrc ? avatarImg.style.backgroundImage = `url(${atob(userData.imgSrc)})` : null;

            avatarFile = this.shadow.getElementById('avatarFile');
            avatarFile.addEventListener('change' , this.getValueFile);

            inputsForm = this.shadow.querySelector('.info').querySelectorAll('input');

            Array.from(inputsForm).forEach(
                (elem , ind) => {
                    elem.name === ['firstName', 'lastName' , 'phone' , 'city'][ind] ?
                        elem.value = userData[elem.name] : null;

                    if(elem.type !== 'file'){
                        elem.addEventListener('change', methodsLib.checkInput);
                        elem.addEventListener('keyup' , methodsLib.checkInput)
                    }
                }
            );

            btnSave = this.shadow.getElementById('save');
            btnSave.addEventListener('click', this.saveData)
        }

        disconnectedCallback() {
            avatarFile.removeEventListener('change' , this.getValueFile);

            Array.from(inputsForm).forEach(
                elem => {
                    elem.removeEventListener('change', methodsLib.checkInput);
                    elem.removeEventListener('keyup' , methodsLib.checkInput)
                }
            );
        }

        getValueFile (e) {
            let type = e.target.files.length !== 0 ?
                e.target.files[0].type.split('/')[0] : null;

            if ( type !== 'image' ) return;

            fileReader.readAsDataURL ( e.target.files[0] );
            fileReader.onload = function ( event ) {

                userData.imgSrc = btoa(event.target.result);

                avatarImg.style.backgroundImage = `url(${event.target.result})`;
                avaSidebar.style.backgroundImage = `url(${event.target.result})`;
            }
        }

        saveData(e){
            methodsLib.checkInput(e);

            Array.from(inputsForm).forEach(
                (elem , ind) => {
                    elem.name === ['firstName', 'lastName' , 'phone' , 'city'][ind] ?
                        userData[elem.name] = elem.value : null;
                }
            );

            userName.textContent = `${userData.firstName} ${userData.lastName}`;
            document.cookie = `firstName=${userData.firstName}`;

            fetch(`http://localhost:3000/users/${userData.id}`, {
                method: 'PUT',
                body: JSON.stringify(
                    userData
                ),
                headers: {
                    "Content-type": "application/json"
                }
            })
        }
    }
}

defineElem('settings-page', createSettings());
methodsLib.createPage(btnSettings , 'settings-page');