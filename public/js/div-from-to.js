function createDivFromTo() {
    let divFromTo = createElem(wrap, 'div');
    divFromTo.className = 'from-to';

    createElem(divFromTo, 'caption-elem')
        .style = `
            display: flex;
            align-items: center;
        `;

    createElem(divFromTo, 'selection-from')
        .style = `
            display: block;
            width: 50%;
        `;

    createElem(divFromTo, 'selection-to')
        .style = `
            display: none;
            width: 50%;
        `;

    location.hash = 'transfer';
}

window.onload = function (e){
    createDivFromTo();
};