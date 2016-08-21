
import React, { Component } from 'react';

const RADIAL_SIZE = 30;

export default class SVGCanvasDroplet extends Component {

    constructor(props) {
        super(props);

        this.state = { showEffect: false };
    }

    componentDidMount() {

        this.setState({ showEffect: true });
    }

    render() {

        const { origin, offsetTop } = this.props;

        const classNames = [ 'SVGCanvasDroplet' ];

        if (this.state.showEffect) {

            classNames.push('rippleEffect');
        }

        if (origin.infinite) {

            classNames.push('-infinite');
        }

        return (
            <span
                className={classNames.join(' ')}
                style={{
                    top: origin.y - (RADIAL_SIZE/2) + offsetTop,
                    left: origin.x - (RADIAL_SIZE/2),
                    height: RADIAL_SIZE,
                    width: RADIAL_SIZE
                }}>
            </span>
        )
    }
}
