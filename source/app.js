import React ,{Component}from 'react'
import React_dom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MyRedux from './MyRedux/components/MyRedux'
import rootReducer from './MyRedux/reducers/index'
class Hello extends Component{
    render(){
        return(
            
            <div>
                Hello   React
            </div>
        );
    }
}

const store = createStore(rootReducer)

React_dom.render(
    <Provider store={store}>
    <MyRedux />
  </Provider> ,
    document.getElementById('root')
);