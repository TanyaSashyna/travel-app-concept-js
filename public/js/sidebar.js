let sidebar = document.getElementById('sidebar');
let burger = document.getElementById('burger');

console.log(sidebar , burger);

function openSidebar (e) {
    sidebar.classList.toggle('open');
    this.classList.toggle('menu-on');
}

burger.addEventListener('click' , openSidebar);