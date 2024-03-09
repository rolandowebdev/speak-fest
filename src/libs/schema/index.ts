import { z } from 'zod'

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: 'Password must be at least 6 characters',
	}),
})

export { authSchema }
