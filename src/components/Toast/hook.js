"use client"
import { useState, useCallback } from "react";
import Toast from './toast.jsx'

// customHook - gives back Component, fn to control that component
const useToast = (position = 'top-right') => {
    const [notification, setNotification] = useState(null);
    let timer;

    // handler to set props for a new instance
    const getNotification = useCallback(
        (props) => {
            clearTimeout(timer);
            setNotification(props);
            timer = setTimeout(() => {
                setNotification(null);
            }, props.duration)
        }
        , []);

    const handleClose = () => {
        clearTimeout(timer);
        setNotification(null);
    }

    const Notification = notification ?
    <div className={`${notification.position}`}>
        <Toast {...notification} handleClose={handleClose}/>
    </div>
        : null;

    return { getNotification, Notification }
}

export default useToast;
