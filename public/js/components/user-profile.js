function createUserProfile () {
    return class UserProfile extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let userProfile = document.getElementById('user-profile');
            this.shadow.appendChild(userProfile.content.cloneNode(true))
        }

        connectedCallback() {
            location.hash = 'profile';

            let avatar = this.shadow.getElementById('avatar');
            userData.imgSrc ? avatar.style.backgroundImage = `url(${atob(userData.imgSrc)})` : null;

            let userFirstName = this.shadow.getElementById('userFirstName');
            userFirstName.textContent = userData.firstName;

            let userLastName = this.shadow.getElementById('userLastName');
            userLastName.textContent = userData.lastName;

            let userPhone = this.shadow.getElementById('userPhone');
            userPhone.textContent = userData.phone;

            let userCity = this.shadow.getElementById('userCity');
            userCity.textContent = userData.city;
        }
    }
}

defineElem('user-profile', createUserProfile());
methodsLib.createPage(btnProfile , 'user-profile');