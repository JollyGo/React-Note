import AppDispatcher from './AppDispatcher'
import constans from './constans'
import {ReduceStore } from 'flux/utils'

class BankBalanceStore extends ReduceStore{
    getInitialState(){
        return 0;
    }
    reduce(state,action){
        switch(action.type){
            case constans.CREATED_ACCOUNT:
                return 0;
            case constans.DEPOSITED_INTO_ACCOUNT:
                return state+action.ammount;
            case constans.WITHDREW_FROM:
                return state-action.action;
            default:
                return state;
        }
    }
}

export default new BankBalanceStore(AppDispatcher);