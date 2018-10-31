import React ,{Component}from 'react'
import React_dom from 'react-dom'
import MyFlux from './MyFlux/MyFlux'
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
    <MyFlux/> ,
    document.getElementById('root')
);