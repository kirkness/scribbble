
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CodeDisplay extends Component {
    render() {
        return (
            <div className={'CodeDisplay'}>

                <div className={'CodeDisplay__header'}>
                    <Link to={'/'}>
                        <i className={'ion-ios-arrow-thin-left'} />
                    </Link>
                </div>

                <div className={'svgWrapper'}>

                </div>

                <div className={'cssWrapper'}>
                    
                </div>
            </div>
        );
    }
}
