import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import styles from './App.module.css'
import clipboard from './assets/clipboard.svg'
import { Header } from './components/Header'
import { Task } from './components/Task';
import { TextArea } from './components/TextArea'

export interface TaskType {
  id: string,
  content: string,
  finished: boolean
}


function App() {

  const [newTask, setNewTask ] = useState('')
  const [taskList, setTaskList] = useState<TaskType[]>([])

  const handleNewTaskChange = ( e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setNewTask( e.target.value )
  }
  
  const handleNewTaskSubmit = ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if( newTask ) {
      const newTaskOnType = {
        id: uuidv4(),
        content: newTask,
        finished: false
      }
      setTaskList( [ newTaskOnType, ...taskList ] )
      setNewTask('')
    }
  }

  const deleteTask = ( taskToDelete: TaskType ) => {
    setTaskList(  taskList.filter( task => task.id !== taskToDelete.id ) )
  }

  const finishTask = ( taskToFinish: TaskType ) => {
    setTaskList( taskList.map( task => {
      if( task.id === taskToFinish.id ){
        task.finished = !task.finished
      }
      return task
    }) )
  }

  return (
    <>
      <Header />

      <main className={styles.main}>

        <form 
          className={styles.formNewTaks}
          onSubmit={e => handleNewTaskSubmit(e)}
        >
          <TextArea 
            value={newTask} 
            onChange={ e => handleNewTaskChange(e)}
            placeholder='Adicione uma nova tarefa'
            required
          />
          <button 
            type='submit' 
            disabled={!newTask}
          > 
            Criar <PlusCircle size={20}/>
          </button>
        </form>

        <div className={styles.taskList} >
          <div className={styles.tasksProgress}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{taskList.length}</span>
            </div>

            <div>
              <strong>Concluídas</strong>
              <span>{taskList.filter(task => task.finished).length} de {taskList.length}</span>
            </div>
          </div>

          { taskList.length <= 0 && (
            <div className={styles.noTask}>
              <img src={clipboard} alt='Imagem de prancheta'/>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}

          <div className={styles.tasks} >
            { taskList.map( task => <Task task={task} onDeleteTask={deleteTask} onFinishTask={finishTask}/>)}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
