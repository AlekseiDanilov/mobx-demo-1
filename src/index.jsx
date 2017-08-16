import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import {Provider} from 'mobx-react'

import Store from './AppState';
import App from './App';


const stores = {
    store: new Store()
};

render(
    <AppContainer>
        <Provider {...stores}>
            <App/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);



if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        render(
            <AppContainer>
                <Provider {...stores}>
                    <NextApp/>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
