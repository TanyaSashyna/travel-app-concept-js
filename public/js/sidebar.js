const sidebar = document.getElementById('sidebar');
const burger = document.getElementById('burger');

function openSidebar (e) {
    sidebar.classList.toggle('open');
    this.classList.toggle('menu-on');

    document.documentElement.clientWidth <=767 ?
        document.querySelector('.bg').classList.toggle('show') : null;
}

burger.addEventListener('click' , openSidebar);