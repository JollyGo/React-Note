import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Snack from './Snack'
import {DragDropContext, DragLayer} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './style.css'

class Container extends Component{
    render(){
        return(
            <div>
                <Snack name='Chips'/>
                <Snack name='Cupcake'/>
                <Snack name='Donut'/>
                <Snack name='Doritos'/>
                <Snack name='Popcorn'/>
                <ShoppingCart/>
            </div>
        )
    }
}
// @DragDropContext(HTML5Backend)
export default DragDropContext(HTML5Backend)(Container);
// export default Container;