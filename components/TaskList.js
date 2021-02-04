import React, {useContext} from 'react'
import {TaskListContext} from '../context/TaskListContext'
import Task from './Task'

// Render the current task list state into the Task List component
const TaskList = () => {
    const {tasks} = useContext(TaskListContext)
    //React.useEffect({console.log(tasks),[tasks]});
    React.useEffect(() => {
        console.log(tasks)
    },[tasks])
    return (// Map through the task lists from the Task List context (state) using className = list
        <div> 
            {tasks.length ? (// Creating a conditional statement to check if the tasks list is empty or not
                            // If not empty then return the <ul> clause as below
                            // If empty, then return a <div> clause saying No Tasks
                            <ul className = 'list'> 
                            {tasks.map((task)=>{
                                // Here each item is represented by a separate component using Li elements from Task.js
                                return <Task task={task} key = {task.id}/>
                
                            })}
                            </ul>
            ) : (
            <div className='no-tasks'> No Tasks </div>
            )} 
        </div>
    )
};

export default TaskList;
