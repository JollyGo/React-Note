import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanApi from '../api/KanbanApi';
let TaskActionCreators={
    addTask(cardId, task){
        AppDispatcher.dispatcherAsync(KanbanApi.addTask(cardId,task),{
            request:constants.CREATE_TASK,
            success:constants.CREATE_TASK_SUCCESS,
            failure:constants.DELETE_TASK_ERROE
        },{cardId, task})
    },
    addTask(cardId, task){
        AppDispatcher.dispatcherAsync(KanbanApi.addTask(cardId,task),{
            request:constants.CREATE_TASK,
            success:constants.CREATE_TASK_SUCCESS,
            failure:constants.DELETE_TASK_ERROR
        },{cardId, task})
    },
    deleteTask(cardId, task, taskIndex){
        AppDispatcher.dispatcherAsync(KanbanApi.deleteTask(cardId,task),{
            request:constants.DELETE_TASK,
            success:constants.DELETE_TASK_SUCCESS,
            failure:constants.DELETE_TASK_ERROR
        },{cardId, task,taskIndex})
    },
    toggleTask(cardId, task, taskIndex){
        AppDispatcher.dispatcherAsync(KanbanApi.toggleTask(cardId,task),{
            request:constants.TOGGLE_TASK,
            success:constants.TOGGLE_TASK_SUCCESS,
            failure:constants.TOGGLE_TASK_ERROR
        },{cardId, task,taskIndex})
    },

};
export default TaskActionCreators