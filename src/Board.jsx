import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Clock from './Clock';

@observer
export default class Board extends Component {
    render() {
        const {clock, imageStore} = this.props;
        return <div className="board" style={{backgroundImage: imageStore.url}}>
            <Clock clock={clock}/>
        </div>;
    }
}

