import React ,{Component}from 'react'
import React_dom from 'react-dom'
import GroceryList from './Main/Grocerylist'
import KanbanBoardContainer from './kankanBoard/KanbanBoardContainer'
// import AnimatedShoppingList from './AnimatedShoppingList/AnimatedShoppingList'
// import Container from './DragDropContext/Container'
class Hello extends Component{
    render(){
        return(
            
            <div>
                Hello   React
                <GroceryList/>
            </div>
        );
    }
}


React_dom.render(
    <KanbanBoardContainer/> ,
    document.getElementById('root')
);