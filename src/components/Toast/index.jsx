"use client"
import useToast from "./hook";

const SampleToast = () => {
    const {Notification, getNotification} = useToast();

    return(
        <>
            <div>
                <button onClick={() => {
                    getNotification({
                        type: 'success',
                        msg: 'Success dummy message',
                        duration: 1000,
                        position: "top-right"
                    })
                }}>Success Toast</button>
                {Notification}
            </div>
            <div>
                <button onClick={() => {
                    getNotification({
                        type: 'error',
                        msg: 'Error dummy message',
                        duration: 2000,
                        position: 'bottom-right'
                    })
                }}>Error Toast</button>
                {Notification}
            </div>
        </>
    )
}

export default SampleToast;
