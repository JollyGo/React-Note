import React , {Component} from 'react'
import PropTypes from 'prop-types'
import TaskActionCreators from '../actions/TaskActionCreators'

class CheckList extends Component{
    checkInputKeyPress(evt){
        if(evt.key == 'Enter'){
            let newTask={id:Date.now(),name:evt.target.value,done:false};
            TaskActionCreators.addTask(this.props.cardId,newTask)
            evt.target.value = '';
        }
    }
    render(){
        let tks = this.props.tasks.map(
            (task, taskIndex)=>{return(
                <li className='checklist_task' key={taskIndex}>
                <input
                    type="checkbox" 
                    defaultChecked={task.done}
                    onChange={
                        TaskActionCreators.toggleTask.bind(null,
                            this.props.cardId,
                            task.id,
                            taskIndex
                            )
                    }
                 />
                {task.name} 
                {' '}         
                <a href='#' 
                    className='checklist_task--remove'
                    onClick={
                        TaskActionCreators.deleteTask.bind(null, this.props.cardId,
                            task,taskIndex)
                    }
                    />
                </li>
            )
            })
        return(
            <div className='checklist'>
                <ul>{tks}</ul>
                <input type='text'
                        className='checklist--add-task'
                        placeholder='Type then hit Enter to add a task'
                        onKeyPress={this.checkInputKeyPress.bind(this)}/>
            </div>
        )
    }
};

CheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
