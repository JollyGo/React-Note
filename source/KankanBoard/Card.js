import React,{Component} from 'react'
import {PropTypes} from 'prop-types'
import CheckList from './Checklist'
import marked from 'marked'

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
        return(
            <div className='card'>
                <div style={sideColor}/>
                <div className={this.state.showDetail ? 'card_title card_title--is-open':'card_title'}
                    onClick={this.toggleDetails}
                    >
                    {this.props.title}
                </div>
                {cardDetails}   
                
            </div>
        )
    }
};

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropTypes,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks:PropTypes.object
}

export default Card;
