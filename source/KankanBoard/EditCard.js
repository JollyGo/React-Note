import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardForm from './CardForm';
// Polyfills
import 'babel-polyfill';

class EditCard extends Component{

  componentWillMount(){
    let card = this.props.cards.find((card)=>card.id == this.props.card_id);
    this.setState(Object.assign({},card));
  }

  handleChange(field, value){
    this.setState({[field]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.cardCallbacks.updateCard(this.state);
    this.props.editHandleClose();
  }

  // const handleClose=()=>{
  //   this.props.editHandleClose;
  // }

  render(){
    return (
      <CardForm draftCard={this.state}
                buttonLabel="Edit Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.props.editHandleClose} />
    )
  }
}

EditCard.propTypes = {
  cardCallbacks: PropTypes.object,
  card_id:PropTypes.number,
  cards: PropTypes.arrayOf(PropTypes.object),
  editHandleClose: PropTypes.func.isRequired
}


export default EditCard;
