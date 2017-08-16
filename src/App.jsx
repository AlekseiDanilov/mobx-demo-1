import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Board from './Board';

@inject('store')
@observer
export default class App extends Component {
    render() {
        const {store} = this.props;
        return (
            <div>
                <Board clock={store.clock} imageStore={store.imageStore}/>
                <DevTools />
            </div>
        );
    }
}
