import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { msgType } from '../../types/msgType';
import { notifyType } from '../../types/notifyType';

import "./NotifyEffect.css";

export const NotifyGreen = forwardRef((props, ref) => {
    const [message, setMessage] = useState('')

    useImperativeHandle(
        ref,
        () => ({
            handleOpen(msg, type) {
                let xmessage = ''

                if (type === notifyType.success || type === notifyType.warning)
                    xmessage = msg.message
                else if (type === notifyType.error) {
                    if (msg.oops) {
                        xmessage = msgType.apiError
                        if (msg.detail)
                            console.log(msg.detail)
                    }
                    else
                        xmessage = msg.message
                }

                setMessage(xmessage)

                const notifyDiv = document.getElementById('notifyGreenDiv');
                notifyDiv.classList.remove("notify-hide");
                notifyDiv.classList.add("notify-show");
                setTimeout(() => {
                    notifyDiv.classList.add("notify-hide");
                    notifyDiv.classList.remove("notify-show");
                }, 5000)
            }
        })
    )

    const handleClose = () => {
        const notifyDiv = document.getElementById('notifyGreenDiv');
        notifyDiv.classList.add("notify-hide");
        notifyDiv.classList.remove("notify-show");
    }

    return (
        <div id='notifyGreenDiv' className={`notify-div rounded-lg z-20 p-4 border border-solid border-green-400 bg-green-50`}>
            <div className="flex text-center">
                <CheckCircleIcon className={`h-4 w-4 mr-1 text-green-400`} aria-hidden="true" />
                <span className='notify-font text-xs font-normal'>{message}</span>
                <div className={`cursor-pointer rounded-md ml-4 hover:bg-green-200`} onClick={handleClose} >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </div>
            </div>
        </div>
    )
})
