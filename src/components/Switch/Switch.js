
import React, { Component } from 'react';

export default class Switch extends Component {

    handleClick() {

        this.props.onSwitch(!this.props.value);
    }

    render() {

        const toggleClasses = [ 'Switch__toggle' ];

        if (this.props.value) {

            toggleClasses.push('-right');
        }
        else {

            toggleClasses.push('-left');
        }

        return (
            <div className={'SwitchWrapper'}>

                <img className={'SwitchWrapper__imgLeft'} src={this.props.iconImageLeft} />

                <div onClick={this.handleClick.bind(this)} className={'Switch'}>

                    <span className={toggleClasses.join(' ')} />

                </div>

                <img className={'SwitchWrapper__imgRight'} src={this.props.iconImageRight} />
            </div>
        );
    }
}
