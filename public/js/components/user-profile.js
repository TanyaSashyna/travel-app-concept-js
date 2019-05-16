function createUserProfile () {
    return class userProfile extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            let userProfile = document.getElementById('user-profile');
            this.shadow.appendChild(userProfile.content.cloneNode(true))
        }

        connectedCallback() {
            location.hash = 'profile';
        }
    }
}

defineElem('user-profile', createUserProfile());


function createProfilePage () {
    Array.from(btnProfile).forEach(
        elem => elem.addEventListener('click' , function (e) {
            e.preventDefault();
            wrap.innerHTML = '';
            createElem(wrap , 'user-profile')
        })
    )
}
createProfilePage ();