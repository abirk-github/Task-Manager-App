import React, {useContext, useState, useEffect} from 'react'
import {TaskListContext} from '../context/TaskListContext'

const TaskForm = () => {
    const {addTask, clearList, editItem, editTask} = useContext(TaskListContext);

    const [title, setTitle] = useState('');

    const handleChange = e => {
        // Grab the value of the input field and store as in the title
        setTitle(e.target.value);
        };
 
    const handleSubmit = e => {
        // Prevents reloading the page after clicking submut button
        e.preventDefault();
        if(!editItem){
            addTask(title);
            setTitle("")
        }
        else{
            editTask(title, editItem.id)
        }
    };
  
    useEffect(() => {
        if(editItem){
            setTitle(editItem.title)
            console.log(editItem)
        }
        else{
            setTitle("")
        }
    }, [editItem])

    return (
        <form onSubmit = {handleSubmit} className='form'> 
        <input type='text' 
        onChange = {handleChange}
        value = {title}
        className='task-input' 
        placeholder = 'Add task...' 
        required />

        <div className = 'buttons'>  
        <button type = 'submit' className = 'btn add-task-btn'>
        {editItem ? 'Edit Task' : 'Add Task'}     
        </button>
        <button onClick = {clearList} type = 'submit' className = 'btn clear-btn'>
        Clear     
        </button>
        </div>

        </form>
    )
}

export default TaskForm
