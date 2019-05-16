const sidebar = document.getElementById('sidebar');
const burger = document.getElementById('burger');
const blockingBg = document.querySelector('.bg')

function openSidebar (e) {
    sidebar.classList.toggle('open');
    this.classList.toggle('menu-on');

    document.documentElement.clientWidth <=767 ?
        blockingBg.classList.toggle('show') : null;
}

function closeSidebar (e) {
    sidebar.classList.remove('open');
    burger.classList.remove('menu-on');
    this.classList.remove('show');
}

burger.addEventListener('click' , openSidebar);
blockingBg.addEventListener('click' , closeSidebar);