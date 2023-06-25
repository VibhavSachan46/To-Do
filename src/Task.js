import React, { useState } from 'react'

const Task = () => {


    const [todos, setTodos] = useState([])

    const [inputTodo, setInputTodo] = useState("")

    const [filter, setFilter] = useState("All")

    // Add task features
    const handleAddTask = () => {

        setTodos([...todos, {
            task: inputTodo,
            id: Date.now().toString(),
            isCompleted: false
        }])
        setInputTodo("");
        console.log([inputTodo, ...todos])
    }
 
    // Delete features

    const handleDeleteTask = (deleteTodoId) => {
        const restTodos = todos.filter((todo) => todo.id !== deleteTodoId)
        setTodos(restTodos)
        console.log(JSON.stringify(restTodos))
    }

    // completed task

    const toggleCompleteTask = (taskId) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === taskId) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            };
            return todo
        });
        setTodos(newTodos)
        console.log(newTodos)
    };

    const handleFilter = () => {
        if (filter === "Active") {
            return todos.filter((todo) => todo.isCompleted === false)
        }
        else if (filter === "Completed") {
            return todos.filter((todo) => todo.isCompleted === true)
        }
        else {
            return todos
        }
    }

    const DeleteAll = () => {
        const activeTodos = todos.filter((todo) => !todo.isCompleted)
        setTodos(activeTodos)
    }

    const remainingTasks = () => {
        const activeTodos = todos.filter((todo) => !todo.isCompleted)
        return activeTodos.length
    }

    return (
        <div>

            <input className='border-2'
                type='text'
                onChange={(e) => setInputTodo(e.target.value)}
                value={inputTodo}
            />
            <button onClick={handleAddTask}>
                Add
            </button>
            {
                todos.length > 0 ? (
                    handleFilter().map((todo, index) => (

                        <div className='flex gap-x-5' key={index}>
                            <input
                                type='checkbox'
                                checked={todo.isCompleted}
                                onClick={() => toggleCompleteTask(todo.id)}
                            />
                            <p>
                                {todo.task}
                            </p>
                            <button className='border-1 rounded-md'
                                onClick={() => handleDeleteTask(todo.id)}>
                                x
                            </button>
                        </div>

                    ))
                ) : (
                    <p>No task to be done</p>
                )

            }

            <div className='flex gap-x-5'>
                {remainingTasks()} remaining todos
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Active")}>Active</button>
                <button onClick={() => setFilter("Completed")}>Completed</button>
            </div>

            <div>
                <button onClick={DeleteAll}>Delete Completed Tasks</button>
            </div>
        </div>
    )
}

export default Task