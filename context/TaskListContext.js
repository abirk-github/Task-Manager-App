import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
//import 'random-uuid-v4'
//import uuid from "react-uuid"



// Creating context for us
export const TaskListContext = createContext()
// Defining initial value for the state
const initialState = JSON.parse(localStorage.getItem('tasks')) || []

// Creating component which include the state
const TaskListContextProvider = props => {
    const [tasks, setTasks] = useState(initialState);

    const [editItem, setEditItem] = useState(null)

    const addTask = (title) => {
        // Adding a new task by using setTasks function to update the current state
        setTasks([...tasks, { title, id: uuid() }]) // Comment on the title elements: According to ES6 syntax if the properties and the values have the same name then we can use only one name (i.e. title:title --> title)
    }

    useEffect(() => {
        localStorage.setItem("tasks",
            JSON.stringify(tasks))
            console.log(localStorage)
    }, [tasks])

    const removeTask = id => {
        // Using filter as array helper method to filter the item out based on its corresponding id
        setTasks(tasks.filter(task => task.id !== id))
    }

    const clearList = () => {
        setTasks([])
    }

    // Finds item that needs to be edited
    const findItem = id => {
        // Finds and compares the current items id with the actual id
        const item = tasks.find(task => task.id === id)

        // Once the needed item has been found then we need to update the state and make the item editable
        setEditItem(item)
    }

    const editTask = (title, id) => {
        const newTasks = tasks.map(task =>
            (task.id === id ? { title, id } : task))

        setTasks(newTasks)
        setEditItem(null)
    }

    return (<TaskListContext.Provider
        value={{ tasks, addTask, removeTask, clearList, findItem, editTask, editItem }}>
        {props.children}
    </TaskListContext.Provider>)
}

export default TaskListContextProvider;

