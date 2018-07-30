import React from 'react'
import ReactDOM from 'react-dom'
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import WidgetListComponent from "./components/WidgetListComponent"
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import WidgetReducer from './reducers/WidgetReducer'
import WidgetListContainer from "./containers/WidgetList"

// ReactDOM.render(
//     <CourseManager/>,
//     document.getElementById('root')
// );

let store = createStore(WidgetReducer)

class App extends React.Component{
    render(){
        return(
            <Provider store = {store}>
                <CourseManager/>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// let store = createStore(WidgetReducer)
//
// class App extends React.Component{
//     render(){
//         return(
//             <Provider store = {store}>
//             <WidgetListContainer/>
//             </Provider>
//         )
//     }
// }
//
// ReactDOM.render(
//     <App/>,
//     document.getElementById('root')
// );