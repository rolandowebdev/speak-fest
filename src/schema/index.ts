import { z } from 'zod'

const authSchema = z.object({
	email: z.string().email({ message: 'Invalid email format' }),
	password: z
		.string()
		.min(6, { message: 'Min. password length is 6 characters' })
		.max(15, { message: 'Max. password length is 15 characters' }),
})

const registerSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Min. name length is 3 characters' })
		.max(50, { message: 'Max. name length is 50 characters' }),
	email: z.string().email({ message: 'Invalid email format' }),
	password: z
		.string()
		.min(6, { message: 'Min. password length is 6 characters' })
		.max(15, { message: 'Max. password length is 15 characters' }),
})

const createThreadSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Min. title length is 3 characters' })
		.max(100, { message: 'Max. title length is 100 characters' })
		.trim(),
	body: z
		.string()
		.min(3, { message: 'Min. body length is 3 characters' })
		.trim(),
	category: z
		.string()
		.min(3, { message: 'Min. category length is 3 characters' })
		.max(20, { message: 'Max. category length is 20 characters' })
		.trim(),
})

const postCommentSchema = z.object({
	comment: z
		.string()
		.min(3, { message: 'Min. comment length is 3 characters' })
		.trim(),
})

export { authSchema, registerSchema, createThreadSchema, postCommentSchema }
