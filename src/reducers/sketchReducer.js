
import Immutable from 'seamless-immutable';
import * as helpers from './helpers.js';
import store from '../store.js';

const defaultState = {
    origin: { x: 0, y: 0 },
    paths: [  ],
    sketching: false,
    window: {
        height: window.innerHeight,
        width: window.innerWidth,
    }
};

export default function sketchReducer(state = defaultState, action) {

    switch (action.type) {
        case 'WINDOW_RESIZE':

            state = windowResize(state, action);
            break;

        case 'INIT_SKETCH':

            state = initSketch(state.asMutable({ deep: true }), action);
            break;

        case 'RELEASE_SKETCH':

            state = releaseSketch(state.asMutable({ deep: true }), action);
            break;

        case 'CLEAR_SKETCH':

            state = clearSketch(state.asMutable({ deep: true }), action);
            break;

        case 'CANVAS_MOUSE_CLICK':

            state = canvasMouseClick(state.asMutable({ deep: true }), action);
            break;

        case 'CANVAS_MOUSE_MOVE':

            state = canvasMouseMove(state.asMutable({ deep: true }), action);
            break;
    }

    return Immutable.from(state);
};


// --------------------------------------------------
// -- HANDLERS
// --------------------------------------------------


function windowResize(state, action) {

    return Object.assign({}, state, {
        window: action.payload
    });
}

function initSketch(state, action) {

    const { paths } = getCurrentPath(state);

    paths.push({
        path: [action.payload],
        hoverOrigin: action.payload,
        origin: action.payload,
    });

    return Object.assign({}, state, {
        paths: paths,
        sketching: true,
    })
}

function clearSketch(state, action) {

    let { paths } = getCurrentPath(state);

    if (isNaN(action.payload)) {

        paths = [];
    }

    else {

        paths.splice(action.payload, 1);
    }

    return Object.assign({}, state, { paths });
}

function canvasMouseMove(state, action) {

    const { last, path, paths } = getCurrentPath(state);
    const freeMode = store.getState().settings.sketchMode === 'FREE';

    if (action.payload.mouseIsDown && freeMode) {

        path.push(action.payload.origin);
        paths[last] = Object.assign({}, paths[last], {
            path: path,
            hoverOrigin: action.payload.origin,
        });
    }

    else {

        const near = helpers.pointNearOrigin(
            action.payload.origin, paths[last].origin
        );

        const hoverOrigin = near ? paths[last].origin : action.payload.origin;
        const snap = snapModeBehaviour(hoverOrigin, path, action.payload.snapMode);

        paths[last] = Object.assign({}, paths[last], {
            path: snap.path,
            hoverOrigin: snap.hoverOrigin,
        });
    }

    return Object.assign({}, state, {
        paths: paths,
    })
}

function canvasMouseClick(state, action) {

    const { last, path, paths } = getCurrentPath(state);

    const isNear = helpers.pointNearOrigin(action.payload.origin, paths[last].origin);
    let point = action.payload.origin;

    if (isNear) {

        point = paths[last].origin;
    }

    let snap = snapModeBehaviour(point, path, action.payload.snapMode);

    snap.path.push(snap.hoverOrigin);
    paths[last] = Object.assign({}, paths[last], {
        path: snap.path,
        hoverOrigin: snap.hoverOrigin,
    });

    return Object.assign({}, state, {
        paths: paths,
        sketching: true
    });
}

function releaseSketch(state, action) {

    console.log('releaseSketch:::');

    const { last, path, paths } = getCurrentPath(state);

    path.push(action.payload);
    paths[last] = Object.assign({}, paths[last], {
        path: path.map(p => {
            delete p.infinite;
            return p;
        })
    })

    return Object.assign({}, state, {
        paths: paths,
        sketching: false
    })
}


// --------------------------------------------------
// -- HELPERS
// --------------------------------------------------

function snapModeBehaviour(hoverOrigin, path, snapMode) {

    if (snapMode) {

        hoverOrigin = helpers.snapToAngle(hoverOrigin, path);

        const snappedToPath = helpers.snapToPath(hoverOrigin, path);
        hoverOrigin = snappedToPath.hoverOrigin;
        path = snappedToPath.path;
    }

    return { hoverOrigin, path };
}

function getCurrentPath(state) {
    const paths = state.paths.slice();
    const last = paths.length - 1;
    const path = paths[last] && paths[last].path.slice() || [];
    return { last, path, paths };
}
