import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import CheckList from './Checklist'
import {Link} from 'react-router-dom'
import marked from 'marked'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {DragSource, DropTarget} from 'react-dnd'
import constants from './constants';

let titlePropTypes = (props, propName, componentName)=>{
    if (props[propName]){
        let value = props[propName];
        if(typeof value !== 'string' || value.length > 30){
            return new Error(
                `${propName} in ${componentName} is longer then 30 characters`
            )
        }
    }
}

const cardDragSpec ={
    beginDrag(props){
        return{
            id:props.id,
            status: props.status
        }
    },
    endDrag(props){
        props.cardCallbacks.presistCardDrag(props.id,props.status)
    }
}

const cardDropSpec = {
    hover(props, monitor){
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId,props.id)
    }
}

let collectDrag = (connect, monitor)=>{
    return{
        connectDragSource: connect.dragSource()
    }
}

let collectDrop = (connect, monitor)=>{
    return{
        connectDropTarget: connect.dropTarget(),
    }
}

class Card extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            showDetail: false
        }
        this.toggleDetails = this.toggleDetails.bind(this)
    }
    toggleDetails(){
        this.setState({
            showDetail:!this.state.showDetail
            })
    }
    render(){
        const {connectDragSource, connectDropTarget} = this.props

        let cardDetails;
        if (this.state.showDetail){
            cardDetails = (
                <div className='card_details'>
                    <span dangerouslySetInnerHTML =
                        {{__html:marked(this.props.description)}}>
                    </span>
                    <CheckList 
                        cardId={this.props.id} 
                        tasks={this.props.tasks}
                        taskCallbacks={this.props.taskCallbacks}
                        />
                </div>
            )
        };
        let sideColor ={
            position: 'absolute',
            zIndex:-1,
            top:0,
            bottom:0,
            left:0,
            width:7,
            backgroundColor: this.props.color
        };        
        return connectDropTarget(connectDragSource(
            <div className='card'>
                <div style={sideColor}/>
                <div className="card_edit" onClick={()=>{this.props.editHandle(this.props.id)}}>✎</div>
                <div className={this.state.showDetail ? 'card_title card_title--is-open':'card_title'}
                    onClick={this.toggleDetails}
                    >
                    {this.props.title}
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}>
                {cardDetails} 
                </ReactCSSTransitionGroup>                
            </div>
        )
        )
    }
};

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropTypes,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    editHandle: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}
const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec,collectDrag)(Card);
const dragDropHighOrderCard =DropTarget(constants.CARD, cardDropSpec,collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;
