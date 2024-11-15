import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "./app/App";
import {store} from "./store";
import {Provider} from "react-redux";
import {AppHttpRequests} from "./app/AppHttpRequests";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store = {store}>
            {/*<App/>*/}
            <AppHttpRequests />
        </Provider>
    </React.StrictMode>
);
