import React, { Component } from 'react'
import KanbanBoard from './KanbanBoard'
import 'babel-polyfill'
import update from 'react-addons-update'
import './style.css'
import {throttle} from './utils'

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like-jiayuyan'
}


class KanbanBoardContainer extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            cards:[],
        }
    }

    addTask(cardId, taskName){
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);

        let newTask = {id:Date.now(),name:taskName, done:false};

        let preState = this.state;

        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$push:[newTask]}
            }
        });

        this.setState({cards: nextState});
        console.log(this.state.cards)

        fetch(`${API_URL}/cards/${cardId}/tasks`,{
            method: 'post',
            headers: API_HEADERS,
            body:JSON.stringify(newTask)
        })
        .then((resp)=>resp.json())
        .then((respData)=>{
            newTask.id=respData.id,
            this.setState({
                cards:nextState
            })
        })
        .catch((error)=>{
            console.error('Fetch error:', error),
            this.setState(preState)
        })

    }
    deleteTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);

        let preState = this.state;

        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{$splice:[[taskIndex,1]]}
            }
        })

        this.setState({cards:nextState})
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`,{
            method:'delete',
            headers: API_HEADERS
        })
        .then((resp)=>console.log('这里是delete成功',resp))
        .catch((error)=>{
            console.log('这里是delete',error),
            this.setState(preState)
        })
    }
    toggletask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let preState = this.state;
        let newDoneValue;
        let nextState = update(this.state.cards,{
            [cardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done:{$apply:(done)=>{
                            newDoneValue =!done
                            return newDoneValue
                        }}
                    }
                }
            }
        });

        this.setState({cards:nextState});

        fetch(`${API_URL}/cards/${cardId}/task/${taskId}`,{
            method:'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
        .catch((error)=>{
            console.error('Fetch error:', error),
            this.setState(preState)
        })
    }
    updateCardStatus(cardId, listId){
        
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);

        let card = this.state.cards[cardIndex]

        if(card.status !== listId){
            this.setState(update(this.state,{
                cards:{
                    [cardIndex]:{
                        status: {$set: listId}
                    }
                }
            }))
        }
    }
    updateCardPosition (cardId, afterId){
        if(cardId !== afterId){
            let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);
            let card = this.state.cards[cardIndex]
            let afterIndex = this.state.cards.findIndex((card)=>card.id==afterId);
            this.setState(update(this.state, {
                cards:{
                    $splice:[
                        [cardIndex,1],
                        [afterIndex,0, card]
                    ]
                }
            }))
        }
    }
    presistCardDrag(cardId, status){
        let cardIndex = this.state.cards.findIndex((card)=>card.id==cardId);
        let card = this.state.cards[cardIndex]
        fetch(`${API_URL}/cards/${cardId}`,{
            method:'put',
            headers: API_HEADERS,
            body: JSON.stringify({status:card.status,row_order_position:cardIndex})
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error('Server respnse wasn`t OK')
            }
        })
        .catch((error)=>{
            console.error('Fetch error:',error);
            this.setState(
                update(this.state,{
                    cards:{
                        [cardIndex]:{
                            status:{$set:status}
                        }
                    }
                })
            )
        })
    }
    componentDidMount(){
        fetch(API_URL+'/cards',{headers: API_HEADERS})
        .then((resp)=>resp.json())
        .then((respData)=>{
            this.setState({
                cards: respData
            })
        })
        .catch((error)=>{
            console.log('error fetching and parsing data',error)
        })
    }

    render(){
        return<KanbanBoard cards={this.state.cards}
                            taskCallbacks={{
                                toggle : this.toggletask.bind(this),
                                delete : this.deleteTask.bind(this),
                                add : this.addTask.bind(this)
                            }}
                            cardCallbacks={{
                                updateStatus: throttle(this.updateCardStatus.bind(this)),
                                updatePosition: throttle(this.updateCardPosition.bind(this)),
                                presistCardDrag: this.presistCardDrag.bind(this)
                            }}
        />
        // return<KanbanBoard cards={cardList}/>
    }
}

export default KanbanBoardContainer
