import React ,{Component}from 'react'
import React_dom from 'react-dom'
import AppContainer from './MyFlux/MyFlux'
class Hello extends Component{
    render(){
        return(
            
            <div>
                Hello   React
            </div>
        );
    }
}


React_dom.render(
    <AppContainer/> ,
    document.getElementById('root')
);