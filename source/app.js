import React from 'react'
import React_dom from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import KanbanBoardContainer from './kankanBoard/KanbanBoardContainer'
import NewCard from './KankanBoard/NewCard'
import EditCard from './KankanBoard/EditCard'
const App =()=>{
    return(
        <Router>
            <div>
            <Route patch='/' component={KanbanBoardContainer}/>
            <Route path='/new' component={NewCard}/>
            <Route path='/edit/:card_id' component={EditCard}/>
            </div>
        </Router>
    )
}
React_dom.render(
    <App/> ,
    document.getElementById('root')
);