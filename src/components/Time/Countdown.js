import React, { memo, useEffect } from 'react'
import { useCountdown } from '../../hooks/useCountdown'

export const Countdown = memo(({ targetSecond, setSecond }) => {
    const second = useCountdown(targetSecond)

    useEffect(() => {
        setSecond(second)
    }, [second, setSecond])

    return (
        <>
            <span className={'inline-flex h-8 w-8 items-center justify-center rounded-full ' + (second % 2 === 0 ? 'bg-indigo-600' : 'bg-gray-600')}>
                <span className="font-light leading-none text-white" style={{
                    fontSize: '0.6rem'
                }}>{second}</span>
            </span>
        </>
    )
})
