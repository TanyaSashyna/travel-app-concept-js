function createDivFromTo() {
    wrap.innerHTML !== "" ? wrap.innerHTML = '' : null;

    let divFromTo = createElem(wrap, 'div');
    divFromTo.className = 'from-to';

    createElem(divFromTo, 'caption-elem');

    createElem(divFromTo, 'selection-from')
        .style.display = 'block';

    createElem(divFromTo, 'selection-to')
        .style.display = 'none';

    location.hash = 'transfer';
}

window.onload = function (e){
    createDivFromTo();
};

function createTransferpage() {
    intercity.addEventListener('click' , function (e) {
        e.preventDefault();
        createDivFromTo();
    })
}
createTransferpage();