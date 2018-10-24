import React, { Component } from 'react'
import ReactCssTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

class AnimatedShoppingList extends Component{
    constructor(){
        super(...arguments)
        this.state={
            items:[
                {id:1, name:'Milk'},
                {id:2, name:'Yoyurt'},
                {id:3, name:'Orange Juice'}
            ]
        }
    }

    handlerChange(evt){
        if(evt.key==='Enter'){
            let newItem = {id:Date.now(), name:evt.target.value}
            let newItems = this.state.items.concat(newItem);
            evt.target.value='';
            this.setState({
                items:newItems
            })
        }
    }

    handlerRemove(i){
        let newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({
            items:newItems
        })
    }

    render(){
        let shoppingItems = this.state.items.map((item, i)=>(
            <div key={item.id}
                 className = 'item'
                 onClick={this.handlerRemove.bind(this,i)}>
                {item.name}
            </div>
        ));
        return(
            <div>
                <ReactCssTransitionGroup transitionName='example'
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    {shoppingItems}
                </ReactCssTransitionGroup>
                
                <input type='text' value={this.state.newItem}
                onKeyDown={this.handlerChange.bind(this)}></input>
            </div>
        )
    }
}

export default AnimatedShoppingList;
