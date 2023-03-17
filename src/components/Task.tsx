import { Trash } from "@phosphor-icons/react"
import { TaskType } from "../App"
import styles from './Task.module.css'

interface TaskProps {
    task: TaskType,
    onDeleteTask: (task: TaskType) => void
    onFinishTask: (task: TaskType) => void
}

export function Task( { task, onDeleteTask, onFinishTask }: TaskProps) {
    
    const handleDeleteTask = () => {
        onDeleteTask( task )
    }

    const handleFinishTask = () => {
        onFinishTask ( task )
    }
    
    return (
        <article className={styles.task}>
            <input type='checkbox' onChange={handleFinishTask} checked={task.finished}/>
            <p className={task.finished ? styles.finished : ''}>{task.content}</p>
            <button onClick={handleDeleteTask}><Trash /></button>
        </article>
    )
}