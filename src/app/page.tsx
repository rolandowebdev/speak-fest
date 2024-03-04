'use client'

import { Button } from '@/components/ui/button'
import { decrement, increment } from '@/lib/features/counter/counterSlice'
import { useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'
import { useDispatch } from 'react-redux'

export default function Home() {
	const count = useAppSelector(
		(states: RootState) => states.counterReducer.value,
	)

	const dispatch = useDispatch()

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<h1 className='text-5xl font-extrabold mb-8'>SpeakFest</h1>
			<div className='w-full max-w-xs flex justify-center items-center flex-col gap-2'>
				<Button className='w-full' onClick={() => dispatch(increment())}>
					+
				</Button>
				<span className='font-bold text-4xl text-ellipsis'>{count}</span>
				<Button className='w-full' onClick={() => dispatch(decrement())}>
					-
				</Button>
			</div>
		</main>
	)
}
