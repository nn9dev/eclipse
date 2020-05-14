let finger, el, style, overflowY, overflowX, initX, initY, atTop, atBtm, targetScrollAxis;

const touchStart = e => {
    el = e.target;
    initX = e.changedTouches[0].pageX;
    initY = e.changedTouches[0].pageY;
    atTop = false;
    atBtm = false;
    // Find scrollable element
    while (el !== document.body) {
        style = getComputedStyle(el)
        if (!style) break;
        overflowY = style.getPropertyValue('overflow-y');
        overflowX = style.getPropertyValue('overflow-x');
        // Detect scrollable elements scroll axis
        if (el.scrollHeight > el.offsetHeight && (overflowY === 'auto' || overflowY === 'scroll')) {
            targetScrollAxis = 'y';
            // Top or bottom end
            if (el.scrollTop < 1) {
                atTop = true;
            } else if (el.scrollTop + el.offsetHeight === el.scrollHeight) {
                atBtm = true;
            }
        } else if (el.scrollWidth > el.offsetWidth && overflowX !== 'hidden') {
            targetScrollAxis = 'x';
        } else {
            targetScrollAxis = '';
        }
        if (targetScrollAxis) {
            return;
        } else {
            el = el.parentNode;
        }
    }
};

const touchMove = e => {
    finger = e.changedTouches[0];
    switch (targetScrollAxis) {
        case 'y':
            if ((atTop && initY < finger.pageY) || (atBtm && initY > finger.pageY))
                e.preventDefault();
            return;
        case 'x':
            if (Math.abs(finger.pageY - initY) > 5)
                e.preventDefault();
            return;
        default:
            e.preventDefault();
            return;
    }
};


document.addEventListener('touchstart', touchStart);
document.addEventListener('touchmove', touchMove, {passive: false});