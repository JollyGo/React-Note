import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like-jiayuyan'
}

let KanbanApi={
    fetchCards(){
        return fetch(`${API_URL}/cards`,{headers:API_HEADERS})
        .then((response)=>response.json())
    },
    addCard(card){
        return fetch(`${API_URL}/cards`,{
            method: 'post',
            headers: API_HEADERS,
            body:JSON.stringify(card)
        })
        .then((resp)=>resp.json())
    },
    updateCard(card, draftCard){
        console.log(card, draftCard)
        return fetch(`${API_URL}/cards/${card.id}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify(draftCard)
        })
        .then((response) => {
          if(!response.ok){
            // Throw an error if server response wasn't 'ok'
            // so we can revert back the optimistic changes
            // made to the UI.
            throw new Error("Server response wasn't OK")
          }
        })
    },
    persistCardDrag(cardId, status, index){
        console.log("asdfabf")
        return fetch(`${API_URL}/cards/${cardId}`,{
            method:'put',
            headers: API_HEADERS,
            body: JSON.stringify({status:status,row_order_position:index})
        })
        .then((response)=>{
            console.log(response)
            if(!response.ok){
                throw new Error('Server respnse wasn`t OK')
            }
        })
    },
    addTask(cardId, task){
        return fetch(`${API_URL}/cards/${cardId}/tasks`,{
            method: 'post',
            headers: API_HEADERS,
            body:JSON.stringify(task)
        })
        .then((resp)=>resp.json())
    },
    deleteTask(cardId,task){
        return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`,{
            method:'delete',
            headers: API_HEADERS
        })
        .then((resp)=>console.log('这里是delete成功',resp))
    },
    toggleTask(cardId,task){
        return fetch(`${API_URL}/cards/${cardId}/task/${task.id}`,{
            method:'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: !task.done})
        })
    }
}
export default KanbanApi