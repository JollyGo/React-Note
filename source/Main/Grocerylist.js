import React ,{ Component} from 'react'
import ListItem from './List_item'
class GroceryList extends Component{
    render(){
        return(
            <ul>
                <ListItem  
                    quantity='1'
                    name='Bread'
                ></ListItem>
                <ListItem
                    quantity='2'
                    name='Eggs'
                ></ListItem>
                <ListItem
                    quantity='3'
                    name='milk'
                ></ListItem>
            </ul>
        )
    }
}

export default  GroceryList