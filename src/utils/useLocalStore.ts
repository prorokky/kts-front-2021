import React, { useEffect } from "react"

export interface ILocalStore {
    destroy(): void
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const container = React.useRef<null | T>(null)

    if (container.current === null) {
        container.current = creator()
    }
    
    useEffect(() => {
        return () => container.current?.destroy()
    }, [])

    return container.current
}