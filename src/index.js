/**
 * Created by Administrator on 2017/5/3 0003.
 */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter as Router,Route, Link,hashHistory} from "react-router-dom";
import {createStore} from "redux";
import reducer from "./reducer";
import App from './Component/App';


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}/>

        </Router>
    </Provider>,
    document.getElementById("main")
);