import React from "react"
import pendingIcon from "../images/pending.png"
import deleteIcon from "../images/delete.png"
import startIcon from "../images/start.png"
import completeIcon from "../images/completed.png"

const Task = ( { value, actions } ) => {
    const { id, text, isCompleted } = value
    const { onDelete, onUpdate ,onStart } = actions

    const handleUpdate = (id) => {
        const updatedTask = prompt("Please make the update", text)
        if(!updatedTask) return
        onUpdate(id, updatedTask)
    }

    return(
        <>
            <div className="task-item">
                <img src={isCompleted ? completeIcon : pendingIcon} className="icon-img" alt="pending"/>
                <span className="task-text" onClick={() => handleUpdate(id)}>{text}</span>
                {!isCompleted && 
                    <span className="btn-group">
                        <img src={startIcon} onClick={() => onStart(id)} className="icon-img btn" alt="start" title="Set Focus"/>
                        <img src={deleteIcon} onClick={() => onDelete(id)} className="icon-img btn" alt="delete" title="Delete"/>
                    </span>
                }
                {isCompleted &&
                    <span className="btn-group">
                    <img src={completeIcon} className="icon-img" alt="complete"/>
                </span>
                }
            </div>
        </>
    )
}

export default Task;