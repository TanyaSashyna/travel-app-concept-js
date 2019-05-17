function createDivFromTo() {
    methodsLib.cleaningWrap();

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

function createTransferPage() {
    intercityLink.addEventListener('click' , function (e) {
        e.preventDefault();
        createDivFromTo();
    })
}
createTransferPage();