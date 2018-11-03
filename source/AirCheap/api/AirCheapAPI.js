import 'whatwg-fetch';
import AirportActionCreators from '../action/AirportActionCreators'

let AirCheapAPI ={
    fetchAorports(){
        fetch('../airport.json')
        .then((response)=>response.json())
        .then((respData)=>{
            AirportActionCreators.fetchAirportsSuccess(respData)
        })
        .catch((error)=>{
            AirportActionCreators.fetchAirportsError(error)
        })
    }
}

export default AirCheapAPI