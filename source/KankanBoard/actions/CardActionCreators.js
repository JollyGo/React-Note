import AppDispatcher from "../AppDispatcher";
import constants from '../constants';
import KanbanApi from '../api/KanbanAPi';
import { throttle } from "../utils";
import CardStore from "../stores/CardStore";

let CardActionCreators = {
    fetchCards(){
        AppDispatcher.dispatcherAsync(KanbanApi.fetchCards(),{
            request:constants.FETCH_CARDS,
            success:constants.FETCH_CARDS_SUCCESS,
            failure:constants.FETCH_CARDS_ERROR
        });
    },
    addCard(card){
        AppDispatcher.dispatcherAsync(KanbanApi.addCard(card),{
            request:constants.CREATE_CARD,
            success:constants.CREATE_CARD_SUCCESS,
            failure:constants.CREATE_CARD_ERROR
        },{card})
    },
    updateCard(card,draftCard){
        AppDispatcher.dispatcherAsync(KanbanApi.updateCard(card,draftCard),{
            request:constants.UPDATE_CARD,
            success:constants.UPDATE_CARD_SUCCESS,
            failure:constants.UPDATE_CARD_ERROR
        },{card, draftCard})
    },
    updateCardStatus:throttle((cardId,listId)=>{
        AppDispatcher.dispatch({
            type:constants.UPDATE_CARD_STATUS,
            payload:{cardId,listId}
        })
    }),
    updateCardPosition:throttle((cardId,afterId)=>{
        AppDispatcher.dispatch({
            type:constants.UPDATE_CARD_POSITION,
            payload:{cardId,afterId}
        })
    },500),
    persistCardDrag(cardProps){
        let card = CardStore.getCard(cardProps.id)
        let cardIndex = CardStore.getCardIndex(cardProps.id)
        AppDispatcher.dispatcherAsync(KanbanApi.persistCardDrag(
            card.id,card.status,cardIndex
        ),{
            request:constants.PERSIST_CARD_DRAG,
            success:constants.PERSIST_CARD_DRAG_SUCCESS,
            failure:constants.PERSIST_CARD_DRAG_ERROR
        },{cardProps})
    },
    createDraft(card) {
        AppDispatcher.dispatch({
          type: constants.CREATE_DRAFT,
          payload: {card}
        });
      },
    
      updateDraft(field, value) {
        AppDispatcher.dispatch({
          type: constants.UPDATE_DRAFT,
          payload: {field, value}
        });
      }
    

};
export default CardActionCreators;