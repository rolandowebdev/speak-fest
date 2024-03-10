import { z } from 'zod'

const authSchema = z.object({
	email: z.string().email({ message: 'Invalid email format' }),
	password: z
		.string()
		.min(6, { message: 'Minimum password length is 6 characters' })
		.max(15, { message: 'Maximum password length is 15 characters' }),
})

const registerSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Minimum name length is 3 characters' })
		.max(50, { message: 'Maximum name length is 50 characters' }),
	email: z.string().email({ message: 'Invalid email format' }),
	password: z
		.string()
		.min(6, { message: 'Minimum password length is 6 characters' })
		.max(15, { message: 'Maximum password length is 15 characters' }),
})

export { authSchema, registerSchema }
