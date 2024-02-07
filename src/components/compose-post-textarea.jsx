'use client'
import { useEffect, useRef } from 'react'
import { useFormStatus } from "react-dom";

export default function ComposePostTextArea (){
    const { pending } = useFormStatus()
    const alreadySent = useRef(false)
    const textAreaRef = useRef(null)

    useEffect( () => {
        if (textAreaRef.current === null) return

        if (!pending && alreadySent.current) {
            alreadySent.current = false
            textAreaRef.current.value = ''
            return
        }
        alreadySent.current = pending
    },[pending] )

    return(
        <textarea
            ref={textAreaRef}
            className="w-full text-2xl bg-black placeholder-gray-500"
            placeholder="What's happening?"
            name="content" 
            id="" 
            rows={4}>
        </textarea>
    )

}