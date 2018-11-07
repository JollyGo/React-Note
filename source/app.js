import React ,{Component}from 'react'
import React_dom from 'react-dom'
import AircheapContainer from './AirCheap/Aircheap'
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
    <AircheapContainer/> ,
    document.getElementById('root')
);