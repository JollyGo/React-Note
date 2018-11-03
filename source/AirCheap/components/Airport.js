import React, { Component } from 'react';
import {Container} from 'flux/utils';
import AirportStore from '../stores/AirportStore'
import Autosuggest from 'react-autosuggest'
import AirportActionCreators from '../action/AirportActionCreators'

class Airport extends Component{

    getSuggestions(input, callback){
        const escapedInput = input.trim().toLowerCase();
        const airportMatchRegex = new RegExp('\\b'+escapedInput,'i');
        const suggestions = this.state.airports.filter(airport=>airportMatchRegex.rest(airport.city))
                                .sort((airpoet1,airport2)=>{
                                    airpoet1.city.toLowerCase().indexOf(escapedInput)-
                                    airport2.city.toLowerCase().indexOf(escapedInput)
                                })
                                .slice(0,7)
                                .map(airport =>`${airport.city}-${airport.country}(${airport.code})`);
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
                        <p>Check discount ticket prices and pay useing your AirCheap points</p>
                    </div>
                    <div className='header-route'>
                        <Autosuggest id='origin'
                            inputAttributes={{placeholder:'From'}}/>
                        <Autosuggest id='description'
                            inputAttributes={{placeholder:'To'}}/>
                    </div>
                </header>
            </div>
        )
    }
}
Airport.getStores=()=>([AirportStore]);
App.calculateState =(prevState)=>({
    airports:AirportStore.getState()
})

const AirportContainer = Container.create(Airport);
export default AirportContainer