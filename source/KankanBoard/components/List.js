import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import Card from'./Card'
import constants from '../constants'
import {DropTarget} from 'react-dnd'
import CardActionCreators from '../actions/CardActionCreators';

const listTargetSpec ={
    hover(props, monitor){
        const dragged = monitor.getItem();
        CardActionCreators.updateCardStatus(dragged.id,props.id)
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
                editHandle={this.props.editHandle}
                {...card}
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
    editHandle: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD,listTargetSpec,collect)(List);