import { Button } from '@/components/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type ButtonCategoryProps = {
	category: string
}

export const ButtonCategory = ({ category }: ButtonCategoryProps) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const getAllCategories = searchParams.getAll('category')

	const handleSetCategories = (currentCategory: string) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()))

		if (!currentCategory) {
			current.delete('category')
		}

		if (getAllCategories.includes(currentCategory)) {
			current.delete('category', currentCategory)
			setSelectedCategory(null)
		} else {
			current.append('category', currentCategory)
			setSelectedCategory(currentCategory)
		}

		const search = current.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`)
	}

	return (
		<Button
			variant='outline'
			onClick={() => handleSetCategories(category)}
			className={selectedCategory === category ? 'bg-accent' : ''}>
			# {category}
		</Button>
	)
}
