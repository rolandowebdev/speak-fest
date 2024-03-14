import { RefCallback, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useMediaQuery } from '@/hooks'

export function useNavigationState() {
  const [isCollapse, setIsCollapse] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const isMobileViewport = useMediaQuery('(max-width: 639px)')

  const { ref: documentRef } = useSwipeable({
    onSwiped: ({ dir, event }) => {
      if (dir === 'Right') {
        if (isMobileViewport) {
          setIsOpen(true)
        } else {
          setIsCollapse(false)
        }
      } else if (dir === 'Left') {
        if (isMobileViewport) {
          setIsOpen(false)
        } else {
          setIsCollapse(true)
        }
      }

      event.stopPropagation()
    },
  }) as { ref: RefCallback<Document> }

  useEffect(() => {
    documentRef(document)

    return () => documentRef(null)
  }, [documentRef])

  return { isCollapse, setIsCollapse, isOpen, setIsOpen }
}
