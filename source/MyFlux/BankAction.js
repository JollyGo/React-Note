import AppDispatcher from './AppDispatcher'
import constans from './constans'

let BankActions={
    createAccount(){
        AppDispatcher.dispatch({
            type:constans.CREATED_ACCOUNT,
            ammount:0
        })
    },
    /**
     * 
     * @param {number} ammount to whithdraw 
     */
    depositIntoAcoubt(ammount){
        AppDispatcher.dispatch({
            type:constans.DEPOSITED_INTO_ACCOUNT,
            ammount:ammount
        })
    },
    /**
     * 
     * @param {number} ammount to withdraw
     */
    withdrawFromAccount(ammount){
        AppDispatcher.dispatch({
            type:constans.WITHDREW_FROM,
            ammount:ammount
        })
    }
}

export default BankActions;
