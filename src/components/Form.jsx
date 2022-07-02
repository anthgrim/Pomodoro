import React, { useState } from "react"

const Form = ( { title, onAdd, totalTasks } ) => {
    const [ task, setTask ] = useState('')

    const handleChange = (e) => setTask(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!task) return
        const newTask = {
            id: totalTasks,
            text: task,
            isCompleted: false
        }
        onAdd(newTask)
        setTask('')
    }

    return(
        <>
            <h4 className="form-title">{title}</h4>
            <form className="custom-form" onSubmit={handleSubmit}>
                <input
                    className="custom-input"
                    type="text"
                    placeholder="Add new task..."
                    name="task"
                    value={task}
                    onChange={e => handleChange(e)}
                />
                <button className="custom-btn">Add</button>
            </form>
        </>
    )
}

export default Form;