import React, { Component } from 'react';
import {Container} from 'flux/utils';
import Autosuggest  from 'react-autosuggest'
import AirportStore from './stores/AirportStore';
import AirportActionCreators from './action/AirportActionCreators'

class Aircheap extends Component{
    getSuggestions(input, callback){
        const escapedInput = input.trim().toLowerCase();
        const airportMatchRegex = new RegExp('\\b'+escapedInput,'i');
        const suggestions = this.state.airport.filter(airport=>airportMatchRegex.test(airport.city))
        .sort((airport1,airport2)=>{
            return airport1.city.toLowerCase().indexOf(escapedInput)-
            airport2.city.toLowerCase().indexOf(escapedInput)
        })
        .slice(0, 7)
        .map(airport=>`${airport.city}-${airport.country}（${airport.code}）`);
        callback(null, suggestions)
    }
    componentDidMount(){
        AirportActionCreators.fetchAirports()
    }
    render(){
        return(
            <div>
                <header>
                    <div className='header-brand'>
                        <img src='logo.png' height='35'/>
                        <p>Chcek discount ticker prices and pay using your Aircheap points</p>
                    </div>
                    <div className='header-route'>
                        <Autosuggest id='origin'
                                     suggestions={this.getSuggestions.bind(this)}
                                     inputAttributes={{placeholder:'From'}}/>
                        <Autosuggest id='destination'
                                     suggestions={this.getSuggestions.bind(this)}
                                     inputAttributes={{placeholder:'To'}}/>
                    </div>
                </header>
            </div>
        )
    }
}

Aircheap.getStores = ()=>([AirportStore]);
Aircheap.calculateState = (prevState)=>({
    airports:AirportStore.getState()
});
const AircheapContainer = Container.create(Aircheap)

export default AircheapContainer