import {EventEmitter} from 'fbemitter'
import AppDispatcher from './AppDispatcher'
import constans from './constans'

const CHANGE_SEVENT='change';
let __emitter = new EventEmitter();
let balance=0

let BankBalanceStore={addListener:(callback)=>{
    return __emitter.addListener(CHANGE_SEVENT, callback)
        }}

BankBalanceStore.dispatchToken=AppDispatcher.register((action)=>{
    switch(action.type){
        case constans.CREATED_ACCOUNT:
            balance=0;
            __emitter.emit(CHANGE_SEVENT)
            break
        case constans.DEPOSITED_INTO_ACCOUNT:
            balance=balance + action.ammount;
            __emitter.emit(CHANGE_SEVENT);
            break
        case constans.WITHDREW_FROM:
            balance=balance-action.ammount;
            __emitter.emit(CHANGE_SEVENT)
            break
    }
})

export default BankBalanceStore;