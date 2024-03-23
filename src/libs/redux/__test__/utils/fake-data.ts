import { Leaderboard, LoginInputs } from '@/types'

const leaderboard: Leaderboard[] = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
]

const userAuth: LoginInputs = {
  email: 'zeta@gmail.com',
  password: 'zeta123',
}

export { leaderboard, userAuth }
