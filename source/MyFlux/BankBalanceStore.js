import AppDispatcher from './AppDispatcher'
import constans from './constans'
import {Store } from 'flux/utils'

let balance=0

class BankBalanceStore extends Store{
    getState(){
        return balance;
    }
    __onDispatch(action){
        switch(action.type){
            case constans.CREATED_ACCOUNT:
                balance=0;
                this.__emitChange();
                break;
            case constans.DEPOSITED_INTO_ACCOUNT:
                balance=balance + action.ammount;
                this.__emitChange();
                break;
            case constans.WITHDREW_FROM:
                balance=balance-action.ammount;
                this.__emitChange();
                break;
        }
    }
}

export default new BankBalanceStore(AppDispatcher);