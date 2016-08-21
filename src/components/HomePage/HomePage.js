
import React, { Component } from 'react';
import SVGCanvas from '../SVGCanvas';
import { windowResize, clearSketch } from '../../actions/sketchActions.js';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import Footer from '../Footer';
import * as settingActions from '../../actions/settingActions';



@connect((s) => ({ settings: s.settings, paths: s.sketch.paths }))

export default class HomePage extends Component {

    handleResize() {

        this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
    }

    handleKeyUp(e) {

        if (e.keyCode === 32) {

            this.props.dispatch(
                settingActions.animationState(
                    this.props.settings.isAnimated ? null : 'PLAY'
                )
            )
        }

        // Backspace
        else if (e.keyCode === 8) {

            this.props.dispatch(
                clearSketch(this.props.paths.length - 1)
            )

            e.preventDefault();
        }

        // Left right keys
        else if (e.keyCode === 37 || e.keyCode === 39) {

            this.props.dispatch(
                settingActions.sketchMode(
                    e.keyCode === 37 ? 'POLY' : 'FREE'
                )
            )
        }
    }

    componentDidMount() {

        this.handleResize = this.handleResize.bind(this);

        window.addEventListener('resize', this.handleResize);

        // Play animation on space bar
        document.body.onkeydown = this.handleKeyUp.bind(this);
    }

    componentWillUnmount() {

        window.removeEventListener('resize', this.handleResize);
    }

    render() {

        const viewClasses = ['main-view'];

        if (this.props.children) {
            viewClasses.push('-sub-view');
        }

        return (
            <div className={'home'}>
                <div className={viewClasses.join(' ')}>
                    <Navbar />

                    <SVGCanvas />

                    <Footer />
                </div>
                
                { /* TODO: this.props.children */ }
            </div>
        );
    }
}
