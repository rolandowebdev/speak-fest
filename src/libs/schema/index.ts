import { z } from 'zod'

const authSchema = z.object({
	email: z.string().email({ message: 'Format email tidak valid' }),
	password: z
		.string()
		.min(6, { message: 'Password minimal 6 karakter' })
		.max(15, { message: 'Password maksimal 15 karakter' }),
})

const registerSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Nama minimal 3 karakter' })
		.max(50, { message: 'Nama maksimal 50 karakter' }),
	email: z.string().email({ message: 'Format email tidak valid' }),
	password: z
		.string()
		.min(6, { message: 'Password minimal 6 karakter' })
		.max(15, { message: 'Password maksimal 15 karakter' }),
})

export { authSchema, registerSchema }
