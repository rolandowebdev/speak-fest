type User = {
	id: string
	name: string
	email: string
	avatar: string
}

type UserResponse = {
	status: string
	message: string
	data: {
		user: User
	}
}

type LoginResponse = {
	status: string
	message: string
	data: {
		token: string
	}
}

type RegisterInput = {
	name: string
	email: string
	password: string
}

type LoginInput = {
	email: string
	password: string
}

export type { User, UserResponse, LoginResponse, RegisterInput, LoginInput }
