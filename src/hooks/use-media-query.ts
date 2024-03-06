import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevent SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches
		}
		return false
	}

	const [matches, setMatches] = useState<boolean>(getMatches(query))

	function handleChange() {
		setMatches(getMatches(query))
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia(query)

		// Triggered at the first client-side load and if query changes
		handleChange()

		// Use addEventListener if addListener is not available
		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', handleChange)
		} else {
			console.warn('Using deprecated method. Consider updating your code.')
			mediaQuery.addListener(handleChange)
		}

		return () => {
			// Remove listener using removeEventListener if available, otherwise use removeListener
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener('change', handleChange)
			} else {
				mediaQuery.removeListener(handleChange)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return matches
}
