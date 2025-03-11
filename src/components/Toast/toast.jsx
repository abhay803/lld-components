// Notification component - support props control on type, message, handleClose
/*  
needs icon support for different types,
basic block styles
type styles
*/
import {} from 'react-icons/ai';
import './index.css'

const icons ={
    success: "",
    info: "",
    error: "",
    warning: ""
}

const Toast = ({type = 'info', msg = 'Custom message', handleClose= () => {}}) => {
    return (<>
        <div className={`toast ${type}`}>
            {icons[type]}
            {msg}
            <span className="close-icon" onClick={handleClose}>{'X'}</span>
        </div>
    </>)
}

export default Toast;