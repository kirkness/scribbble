
export function updateAnimationConfig(payload) {
    return {
        type: 'UPDATE_ANIMATION_CONFIG',
        payload
    }
}

export function sketchMode(payload) {
    return {
        type: 'SKETCH_MODE',
        payload
    }
}

export function animationState(payload) {
    return {
        type: 'ANIMATION_STATE',
        payload
    }
}

export function toggleMenu() {
    return {
        type: 'TOGGLE_SETTINGS_MENU',
    }
}
