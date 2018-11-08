import React, { Component } from 'react'
import KanbanBoard from './KanbanBoard'
import 'babel-polyfill'
import '../style.css'
import {Container} from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators'
import CardStore from '../stores/CardStore'



class KanbanBoardContainer extends Component{

    componentDidMount(){
        CardActionCreators.fetchCards()
    }


    render(){
        return<KanbanBoard cards={this.state.cards}/>
        // return<KanbanBoard cards={cardList}/>
    }
}

KanbanBoardContainer.getStores=()=>([CardStore]);
KanbanBoardContainer.calculateState=(prevState)=>({
    cards:CardStore.getState()
})

export default Container.create(KanbanBoardContainer)
