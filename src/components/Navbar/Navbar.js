
import React, { Component } from 'react';
import Switch from '../Switch';
import { connect } from 'react-redux';
import * as settingActions from '../../actions/settingActions.js';
import PolyLine from '../../assets/PolyLine.png';
import FreeLine from '../../assets/FreeLine.png';

@connect(state => ({
    sketchMode: state.settings.sketchMode
}))

export default class Navbar extends Component {

    handleSketchModeSwitch(value) {

        const payload = value ? 'FREE' : 'POLY';
        this.props.dispatch(settingActions.sketchMode(payload));
    }

    render() {

        const value = this.props.sketchMode === 'FREE';

        return (
            <div className={'Navbar'}>
                <div className={'Navbar__left'}>
                    <h1>Scribbble</h1>
                </div>
                <div className={'Navbar__right'}>

                    <Switch
                        iconImageLeft={PolyLine}
                        iconImageRight={FreeLine}
                        value={value}
                        onSwitch={this.handleSketchModeSwitch.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
