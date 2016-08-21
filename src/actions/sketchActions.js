
export function windowResize(width, height) {
    return {
        type: 'WINDOW_RESIZE',
        payload: { width, height }
    }
}

export function initSketch(origin) {
    return {
        type: 'INIT_SKETCH',
        payload: origin
    }
}

export function releaseSketch(origin) {
    return {
        type: 'RELEASE_SKETCH',
        payload: origin
    }
}

export function clearSketch(index) {
    return {
        type: 'CLEAR_SKETCH',
        payload: index
    }
}

export function mouseMove(coords, snapMode, mouseIsDown) {
    return {
        type: 'CANVAS_MOUSE_MOVE',
        payload: { origin: coords, snapMode, mouseIsDown },

    }
}

export function mouseClick(coords, snapMode) {
    return {
        type: 'CANVAS_MOUSE_CLICK',
        payload: { origin: coords, snapMode },
    }
}
