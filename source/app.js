import React ,{Component}from 'react'
import React_dom from 'react-dom'
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
    <Hello/> ,
    document.getElementById('root')
);