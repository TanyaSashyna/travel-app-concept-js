//Этот компонент еще в разработке

function createSettings () {
    let avatarImg,avatarFile;

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
            avatarFile = this.shadow.getElementById('avatarFile');

            console.log(avatarImg);

            avatarFile.addEventListener('change' , this.getValueFile)
        }

        getValueFile (e) {
            let file = this.files[0];
            console.log(file.name);

            //avatarImg.src = `img/${file.name}` в разработке
        }
    }
}

defineElem('settings-page', createSettings());

function createSettingsPage() {
    settingsLink.addEventListener('click' , function (e) {
        e.preventDefault();
        methodsLib.cleaningWrap();
        createElem(wrap, 'settings-page')
    })
}
createSettingsPage();