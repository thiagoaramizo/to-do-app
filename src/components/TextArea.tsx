import styles from './TextArea.module.css'


interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export function TextArea( {...props} : TextAreaProps ) {
    return <textarea className={styles.textarea} {...props}/>
}