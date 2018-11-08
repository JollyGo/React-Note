import React from 'react'
import React_dom from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import KanbanBoardContainer from './KankanBoard/components/KanbanBoardContainer'
const App =()=>{
    return(
        <Router>
            <div>
            <Route patch='/' component={KanbanBoardContainer}/>
            </div>
        </Router>
    )
}
React_dom.render(
    <App/> ,
    document.getElementById('root')
);