import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Clock extends Component {
    render() {
        const {clock} = this.props;
        return <div className="clock">
            <strong className="clock_city">{clock.city}</strong>
            <div className="clock_timer">
                {clock.hours}:{clock.minutes}:{clock.seconds}
            </div>
        </div>
    }
}