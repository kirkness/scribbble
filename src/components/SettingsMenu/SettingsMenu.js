

import React, { Component } from 'react';
import store from '../../store.js';
import * as settingActions from '../../actions/settingActions.js'
import Slider from 'rc-slider';

export default class SettingsMenu extends Component {

    renderSlider(slider) {

        const { settings } = this.props;

        return (
            <div className={'SliderWrapper'}>
                <label>{ slider.label }</label>

                <Slider
                    min={slider.min||0}
                    max={slider.max||2000}
                    value={settings.animationConfig[slider.settingProp]}
                    onChange={(val) =>
                        store.dispatch(settingActions.updateAnimationConfig(
                        { [slider.settingProp]: val }
                        ))
                    }
                />
            </div>
        );
    }

    renderMenu() {

        const className = [ 'SettingsMenu' ];

        if (this.props.settings.menuOpen) {

            className.push('-visible');
        }

        return (
            <div className={className.join(' ')}>

                { this.renderSlider({
                    label: 'Dash length',
                    settingProp: 'strokeDasharray'
                }) }

                { this.renderSlider({
                    label: 'Dash offset',
                    settingProp: 'strokeDashoffset'
                }) }

                { this.renderSlider({
                    label: 'Stroke width',
                    settingProp: 'strokeWidth',
                    min: 1,
                    max: 50
                }) }

            </div>
        );
    }

    render() {

        return (
            <div className={'SettingsMenuWrapper'}>

                { this.renderMenu() }

                <i
                    className={'ion-ios-settings'}
                    onClick={() => store.dispatch(settingActions.toggleMenu())}
                />
            </div>
        );
    }
}
