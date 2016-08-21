
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as sketchActions from '../../actions/sketchActions.js';
import SVGPath from './SVGPath.js';
import SVGCanvasDroplet from './SVGCanvasDroplet.js';
import HelperNotice from './HelperNotice.js';

@connect((state) => {
    return {
        sketch: state.sketch,
        freeDrawMode: state.settings.sketchMode === 'FREE',
    };
})

export default class SVGCanvas extends Component {

    get canvasOffset() {
        return this.refs.wrapper && this.refs.wrapper.offsetTop;
    }

    get shouldPrevent() {
        return ~window.location.pathname.indexOf('code');
    }

    getEventPosition(event) {

        return {
            x:event.pageX, y:event.pageY - this.canvasOffset
        }
    }

    handleMouseDown({ nativeEvent }) {

        if (this.shouldPrevent) return false;

        if (this.props.freeDrawMode) {

            this.props.dispatch(
                sketchActions.initSketch(
                    this.getEventPosition(nativeEvent)
                )
            );

            this._preventNextClick = true;
        }
    }

    handleMouseUp(e) {

        if (this.shouldPrevent) return false;

        if (this.props.freeDrawMode) {

            this.props.dispatch(
                sketchActions.releaseSketch(
                    this.getEventPosition(e.nativeEvent)
                )
            );
        }
    }

    handleCanvasClick({ nativeEvent }) {

        if (this.shouldPrevent) {

            browserHistory.push('/');
            return false;
        }

        if (this.props.sketch.sketching) {

            this.props.dispatch(
                sketchActions.mouseClick(
                    this.getEventPosition(nativeEvent),
                    nativeEvent.shiftKey
                )
            );
        }

        else {

            if (this._preventNextClick) {

                this._preventNextClick = false;
            }

            else {

                this.props.dispatch(
                    sketchActions.initSketch(
                        this.getEventPosition(nativeEvent)
                    )
                );
            }
        }
    }

    handleMouseMove(e) {

        if (this.shouldPrevent) return false;

        const { which, buttons } = e.nativeEvent;
        const mouseIsDown = which === 1 || buttons === 1;

        const { sketch, freeDrawMode } = this.props;
        const freeDownMoving = freeDrawMode && mouseIsDown;

        if (sketch.sketching || freeDownMoving) {

            this.props.dispatch(
                sketchActions.mouseMove(
                    this.getEventPosition(e.nativeEvent),
                    e.nativeEvent.shiftKey,
                    mouseIsDown
                )
            );
        }
    }

    handleContextMenu(e) {

        if (this.shouldPrevent) return false;

        if (!this.props.sketch.sketching) {
            return e;
        }

        e.preventDefault();

        this.props.dispatch(
            sketchActions.releaseSketch(
                this.getEventPosition(e.nativeEvent)
            )
        );
    }

    renderDropletPoint(origin, i) {

        return (
            <SVGCanvasDroplet
                offsetTop={this.canvasOffset}
                origin={origin}
                key={i}
            />
        );
    }

    render() {

        const { sketch } = this.props;

        return (
            <div
                ref={'wrapper'}
                className={'canvasWrapper'}
                onClick={this.handleCanvasClick.bind(this)}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onContextMenu={this.handleContextMenu.bind(this)}>

                <HelperNotice visible={!sketch.paths.length} />

                <svg
                    height={sketch.window.height} width={sketch.window.width}>

                    { sketch.paths.map((path, i) => (
                        <SVGPath
                            key={i}
                            path={path}
                            sketching={sketch.sketching}
                        />
                    )) }

                </svg>

                { sketch.paths.map(({path}) => path.map(this.renderDropletPoint.bind(this))) }

            </div>
        );
    }
}
