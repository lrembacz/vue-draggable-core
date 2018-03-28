import {getTouch, offsetXYFromParent} from './domFns'


// Get {x, y} positions from event.
export function getControlPosition(event, touchIdentifier, draggableCore) {
    let touchObj = null;
    touchObj = typeof touchIdentifier === 'number' ? getTouch(event, touchIdentifier) : null;
    if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
    const node = event.target;
    // User can provide an offsetParent if desired.
    //event.target.offsetParent || node.offsetParent ||
    const offsetParent =  node.ownerDocument.body;
    if (touchObj !== null)
        return offsetXYFromParent(touchObj, offsetParent);
    return offsetXYFromParent(event, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
export function createCoreData(draggableCore, x, y, lastX, lastY) {

    const isStart = !isNum(lastX);
    const node = draggableCore.$el;

   // console.log(x, y, lastX, lastY);

    if (isStart) {
        // If this is our first move, use the x and y as last coords.
        return {
            node,
            deltaX: 0, deltaY: 0,
            lastX: x, lastY: y,
            x, y,
        };
    } else {
        // Otherwise calculate proper values.
        return {
            node,
            deltaX: x - lastX, deltaY: y - lastY,
            lastX: lastX, lastY: lastY,
            x, y,
        };
    }
}

export function isNum(num) {
    console.log('isNum?', typeof num === 'number' && !isNaN(num))
    return typeof num === 'number' && !isNaN(num);
}

export function snapToGrid(grid, pendingX, pendingY) {
    const x = Math.round(pendingX / grid[0]) * grid[0];
    const y = Math.round(pendingY / grid[1]) * grid[1];
    return [x, y];
}