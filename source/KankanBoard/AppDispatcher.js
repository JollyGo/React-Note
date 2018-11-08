import {Dispatcher} from 'flux';
import 'babel-polyfill'
class AppDispather extends Dispatcher{
    dispatcherAsync(promise, types, payload){
        const {request, success, failure}=types;
        this.dispatch({types: request, payload:Object.assign({}, payload)});
        promise.then(
            response => this.dispatch({
                types:success,
                payload:Object.assign({},payload,{response})
            }),
            error=>this.dispatch({
                types:failure,
                payload:Object.assign({},payload,{error})
            })
        )
            
    }
}

export default new AppDispather()