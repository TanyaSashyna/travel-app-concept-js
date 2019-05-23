function createUserProfile () {
    return class UserProfile extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let userProfile = document.getElementById('user-profile');
            this.shadow.appendChild(userProfile.content.cloneNode(true))
        }

        connectedCallback() {
            let avatar = this.shadow.getElementById('avatar');
            userData.imgSrc ? avatar.style.backgroundImage = `url(${atob(userData.imgSrc)})` : null;

            for (let key in userData) {
                this.shadow.getElementById(key) ?
                    this.shadow.getElementById(key).textContent = userData[key] : null;
            }
        }
    }
}

defineElem('user-profile', createUserProfile());
methodsLib.createPage(btnProfile , 'user-profile');