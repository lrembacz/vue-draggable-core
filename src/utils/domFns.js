import {findInArray, isFunction, int} from './shims';

let matchesSelectorFunc = '';
export function matchesSelector(el, selector) {
    if (!matchesSelectorFunc) {
        matchesSelectorFunc = findInArray([
            'matches',
            'webkitMatchesSelector',
            'mozMatchesSelector',
            'msMatchesSelector',
            'oMatchesSelector'
        ], function(method){
            // $FlowIgnore: Doesn't think elements are indexable
            return isFunction(el[method]);
        });
    }

    // Might not be found entirely (not an Element?) - in that case, bail
    // $FlowIgnore: Doesn't think elements are indexable
    if (!isFunction(el[matchesSelectorFunc])) return false;

    // $FlowIgnore: Doesn't think elements are indexable
    return el[matchesSelectorFunc](selector);
}

// Works up the tree to the draggable itself attempting to match selector.
export function matchesSelectorAndParentsTo(el, selector, baseNode) {
    let node = el;
    do {
        if (matchesSelector(node, selector)) return true;
        if (node === baseNode) return false;
        node = node.parentNode;
    } while (node);

    return false;
}

// Get from offsetParent
export function offsetXYFromParent(evt, offsetParent) {
    const isBody = offsetParent === offsetParent.ownerDocument.body;
    const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

    const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
    const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

    return {x, y};
}

export function addEvent(el, event, handler) {
    if (!el) { return; }
    if (el.attachEvent) {
        el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
        el.addEventListener(event, handler, true);
    } else {
        // $FlowIgnore: Doesn't think elements are indexable
        el['on' + event] = handler;
    }
}

export function removeEvent(el, event, handler) {
    if (!el) { return; }
    if (el.detachEvent) {
        el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true);
    } else {
        // $FlowIgnore: Doesn't think elements are indexable
        el['on' + event] = null;
    }
}

export function getTouch(event, identifier) {
    return (event.targetTouches && findInArray(event.targetTouches, t => identifier === t.identifier)) ||
        (event.changedTouches && findInArray(event.changedTouches, t => identifier === t.identifier));
}

export function getTouchIdentifier(event) {
    if (event.targetTouches && event.targetTouches[0]) return event.targetTouches[0].identifier;
    if (event.changedTouches && event.changedTouches[0]) return event.changedTouches[0].identifier;
}