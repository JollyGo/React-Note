import React from 'react'
import React_dom from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import history from 'history'
import KanbanBoardContainer from './kankanBoard/KanbanBoardContainer'
const App =()=>{
    return(
        <Router history={history}>
            <Route component={KanbanBoardContainer}></Route>
        </Router>
    )
}
React_dom.render(
    <KanbanBoardContainer/> ,
    document.getElementById('root')
);