
import * as helpers from './helpers.js';

const defaultState = {
    sketchMode: 'POLY',
    isAnimated: false,
    animationConfig: {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 4,
        easing: 'linear',
        strokeWidth: 3
    },
    menuOpen: false
};

export default function sketchReducer(state = defaultState, action) {

    switch (action.type) {
        case 'SKETCH_MODE':

            state = sketchMode(state, action);
            break;

        case 'UPDATE_ANIMATION_CONFIG':

            state = updateAnimationConfig(state, action);
            break;

        case 'ANIMATION_STATE':

            state = animationState(state, action);
            break;

        case 'TOGGLE_SETTINGS_MENU':

            state = settingsMenu(state, action);
            break;

    }

    return state;
};


// --------------------------------------------------
// -- HANDLERS
// --------------------------------------------------

function updateAnimationConfig(state, action) {

    return Object.assign({}, state, {
        animationConfig: Object.assign(
            {}, state.animationConfig, action.payload
        )
    })
}

function settingsMenu(state) {
    state = Object.assign({}, state, {
        menuOpen: !state.menuOpen
    })

    return state;
}

function animationState(state, action) {

    return Object.assign({}, state, {
        isAnimated: action.payload === 'PLAY'
    });
}

function sketchMode(state, action) {

    return Object.assign({}, state, {
        sketchMode: action.payload
    });
}
