import React, { Component } from 'react';
import BankBalanceStore from './BankBalanceStore'
import BankAction from './BankAction' 
import {Container} from 'flux/utils'
import './style.css'

class MyFlux extends Component{
    constructor(){
        super(...arguments);
        BankAction.createAccount();
    }
    deposit(){
        BankAction.depositIntoAcoubt(Number(this.refs.ammount.value));
        this.refs.ammount.value = ''
    }
    withdraw(){
        BankAction.withdrawFromAccount(Number(this.refs.ammount.value));
        this.refs.ammount.value = ''
    }
    render(){
        return(
            <div>
                <header>MyFlux Bank</header>
                <h1> You balance is ￥{(this.state.balance).toFixed(2)}</h1>
                <div className='atm'>
                    <input type="text" placeholder='Enter Ammount' ref='ammount'></input>
                    <br/>
                    <button onClick={this.withdraw.bind(this)}>Wirhdraw</button>
                    <button onClick={this.deposit.bind(this)}>Deposit</button>
                </div>
            </div>
        )
    }
}
MyFlux.getStores=()=>([BankBalanceStore])
MyFlux.calculateState = (prevState)=>({balance:BankBalanceStore.getState()})
const AppContainer = Container.create(MyFlux)
export default AppContainer