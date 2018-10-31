import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import Card from'./Card'
import constants from './constants'
import {DropTarget} from 'react-dnd'

const listTargetSpec ={
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id)
    }
}

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class List extends Component{
    render(){
        const {connectDropTarget} = this.props;
        let card = this.props.cards.map((card)=>{
            return(
            <Card 
                key={card.id}
                taskCallbacks={this.props.taskCallbacks}
                cardCallbacks={this.props.cardCallbacks}
                id={card.id}
                title = {card.title}
                description = {card.description}
                editHandle ={this.props.editHandle}
                tasks = {card.tasks}
                color = {card.color}
            ></Card>
            )
        })
        return connectDropTarget(
            <div className='list'>
                <h1>{this.props.title}</h1>
                {card}
            </div>
        )
    }
};

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks:PropTypes.object,
    cardCallbacks: PropTypes.object,
    editHandle: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD,listTargetSpec,collect)(List);