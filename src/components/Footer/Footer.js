
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as settingActions from '../../actions/settingActions.js';
import SettingsMenu from '../SettingsMenu';

@connect(state => {
    return {
        sketch: state.sketch,
        settings: state.settings
    }
})

export default class Footer extends Component {
    render() {

        const { sketch, settings } = this.props;
        const classNames = [ 'Footer' ];

        if (sketch.sketching || sketch.paths.length) {

            classNames.push('-visible');
        }


        return (
            <div className={classNames.join(' ')}>

                <div className={'Footer__controllers'}>

                    <i
                        className={'ion-ios-pause'}
                        onClick={() => this.props.dispatch(settingActions.animationState(null))}
                    />

                    <i
                        className={'ion-ios-play ' + (settings.isAnimated && '-highlight')}
                        onClick={() => this.props.dispatch(settingActions.animationState(settings.isAnimated ? null:'PLAY'))}
                    />

                </div>

                <div className={'Footer__settings'}>

                    { /* TODO: <Link to={'/code'}>
                        <i className={'ion-code'} />
                    </Link> */ }

                    <SettingsMenu settings={settings} />
                </div>
            </div>
        )
    }
}
