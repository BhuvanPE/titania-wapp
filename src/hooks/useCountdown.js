import { useEffect, useState } from "react"

export const useCountdown = (targetSecond) => {
    const [second, setSecond] = useState(targetSecond)

    useEffect(() => {
        const interval = setInterval(() => {
            setSecond((prev) => prev > 0 ? prev - 1 : prev)
        }, 1000);

        return () => clearInterval(interval);
    }, [targetSecond])

    return second
}