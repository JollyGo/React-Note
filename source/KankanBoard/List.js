import React ,{Component} from 'react'
import PropTypes from 'prop-types'
import Card from'./Card'

class List extends Component{
    render(){
        var card = this.props.cards.map((card, key)=>{
            return(
            <Card 
                key={key}
                taskCallbacks={this.props.taskCallbacks}
                id={card.id}
                title = {card.title}
                description = {card.description}
                tasks = {card.tasks}
                color = {card.color}
            ></Card>
            )
        })
        return(
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
    taskCallbacks:PropTypes.object
};

export default List;