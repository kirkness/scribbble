
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
    isAnimated: state.settings.isAnimated,
    animationConfig: state.settings.animationConfig
}))
export default class SVGPath extends Component {

    render() {

        const { path, isAnimated, animationConfig } = this.props;

        const style = isAnimated ? {
            strokeDasharray: animationConfig.strokeDasharray,
            strokeDashoffset: animationConfig.strokeDashoffset,
            animation: `PathAnimation ${animationConfig.duration}s linear forwards`,
            animationIterationCount: 'infinite',
        } : {};

        return (
            <path
                d={'M' + this._formatPathString(path.path, path.hoverOrigin)}
                fill="none"
                stroke='#3F5765'
                strokeWidth="2px"
                style={Object.assign({}, {
                    fill:'none',
                    strokeWidth: animationConfig.strokeWidth
                }, style)}
            />
        );
    }

    _formatPathString(path, hoverOrigin) {
        return [...path, hoverOrigin].map(({ x, y }) => `${x},${y}`).join(' ');
    }
}
