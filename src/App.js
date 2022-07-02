import { useState } from "react"
import Form from './components/Form';
import Task from "./components/Task";
import Pomodoro from "./components/Pomodoro";
import './App.css';


function App() {
  const [ tasks, setTasks ] = useState([])
  const [ focusTask, setFocusTask ] = useState('')

  const addNewTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const onClickActions = {
    onDelete: (id) => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    },
    onUpdate: (id, updateText) =>{
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          return task.id === id ? {...task, text: updateText} : task
        })
      })
    },
    onStart: (id) => {
      const targetTask = tasks.filter(task => task.id === id)
      setFocusTask(targetTask[0].text)
    }
  }

  const pendingTasks = tasks.map((task, index) => {
    return(
      <>
        {!task.isCompleted &&
          <Task 
            key={index}
            value={task}
            actions={onClickActions}
          />
        }
      </>
    )
  })

  return (
    <div className="App">

      <div className='info-container'>
        <Form title="Add New Task" onAdd={addNewTask} totalTasks={tasks.length}/>
        <section>
          {pendingTasks.length > 0 ? <p>My Task List</p> : null}
          {pendingTasks}
        </section>
      </div>

      <div className='pomodoro'>
        <h5 className="focus-task">{!focusTask ? "Focus Task" : focusTask}</h5>
        <Pomodoro />
      </div>

    </div>
  );
}

export default App;
