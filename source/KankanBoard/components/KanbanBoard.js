import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import List from './List'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import EditCard from './EditCard'
import NewCard from './NewCard'

class KanbanBoard extends Component{
    constructor(){
        super(...arguments)
        this.state={
            edit_card: false,
            new_card: false,
            card_id:0
        }
    }
    editHandle(card_id){
        this.setState({
            edit_card: true,
            card_id:card_id
        })
    }
    editHandleClose(){
        this.setState({
            edit_card:false
        })
    }
    newHandle(){
        this.setState({
            new_card: true
        })
    }
    newHandleClose(){
        this.setState({
            new_card: false
        })
    }
    render(){
        return(
            <div className='app'>
                <div onClick={this.newHandle.bind(this)} className="float-button">+</div>
                <List id = 'todo' 
                    title = 'To Do'
                    editHandle={this.editHandle.bind(this)}
                    cards={
                        this.props.cards.filter((card)=>{
                            return card.status==='todo'})
                }/>
                <List id = 'in-progress' 
                    title = 'In Progress' 
                    editHandle={this.editHandle.bind(this)}
                    cards={
                        this.props.cards.filter((card)=>card.status==='in-progress')
                }/>
                <List id = 'done' 
                    title = 'Done' 
                    editHandle={this.editHandle.bind(this)}
                    cards={
                        this.props.cards.filter((card)=>card.status==='done')
                }/> 
                {this.state.edit_card?<EditCard cardCallbacks={this.props.cardCallbacks}
                                                card_id={this.state.card_id}
                                                cards={this.props.cards}
                                                editHandleClose={this.editHandleClose.bind(this)}/>:null}
                {this.state.new_card?  <NewCard cardCallbacks={this.props.cardCallbacks}
                                                newHandleClose={this.newHandleClose.bind(this)}/>:null}
            </div>
        )
    }
};

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
