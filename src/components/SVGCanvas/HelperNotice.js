
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class HelperNotice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tipIndex: 0
        }
    }

    componentDidMount() {

        this.interval = setInterval(() => {

            let { tipIndex } = this.state;

            if (tipIndex === this.tips.length -1) {

                tipIndex = 0;
            }
            else {

                tipIndex++;
            }

            this.setState({ tipIndex });

        }, 2000);
    }

    componentWillUnmount() {

        clearInterval(this.interval);
    }

    renderTip() {

        return (
            <p
                className={'HelperNotice__tip'}
                key={this.state.tipIndex}>

                {`TIP: ${this.tips[this.state.tipIndex]}`}
            </p>
        );
    }

    render() {

        const { visible } = this.props;
        const classNames = ['HelperNotice'];

        if (visible) {

            classNames.push('-visible');
        }

        return (
            <div className={classNames.join(' ')}>
                <p>Click anywhere to start scribbling</p>

                <ReactCSSTransitionGroup
                    transitionLeaveTimeout={500}
                    transitionEnterTimeout={500}
                    transitionName={'tipCarousel'}>

                    { this.renderTip() }
                </ReactCSSTransitionGroup>

            </div>
        );
    }

    get tips() {

        return [
            `Hold 'SHIFT' to snap corners and angles`,
            `Hit 'BACKSPACE' to delete the last line`,
            `Hit the left/right keys to toggle between polyline and pencil modes`,
            `Hit 'SPACE' to play the SVG animation`,
            `Right click to complete a polyline`
        ];
    }
}
