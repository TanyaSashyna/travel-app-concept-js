function createDivFromTo() {
    methodsLib.cleaningWrap();

    let divFromTo = createElem(wrap, 'div');
    divFromTo.className = 'from-to';

    createElem(divFromTo, 'caption-elem');

    createElem(divFromTo, 'selection-from')
        .style.display = 'block';

    createElem(divFromTo, 'selection-to')
        .style.display = 'none';

    location.hash = intercityLink.getAttribute('href')
}


intercityLink.addEventListener('click' , function (e) {
    e.preventDefault();
    createDivFromTo();
});
