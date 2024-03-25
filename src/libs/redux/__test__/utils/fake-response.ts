const authToken = 'secret-token'

const leaderboardResponse = [
  {
    score: 10,
    user: {
      id: 'user-1',
      name: 'Vestia Zeta',
      email: 'zeta@gmail.com',
      avatar: 'https://generated-random-image.png',
    },
  },
]

const usersResponse = [
  {
    id: 'users-1',
    name: 'Vestia Zeta',
    email: 'zeta@gmail.com',
    avatar: 'https://generated-random-image.png',
  },
]

const threadsResponse = [
  {
    id: 'thread-1',
    title: 'Zeta Thread',
    body: 'This is a thread about Zeta',
    category: 'hololive',
    createdAt: '2024-01-01T00:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
]

const errorResponse = {
  status: 'error',
  message: 'Not found! Please try again.',
  data: {},
}

export {
  authToken,
  leaderboardResponse,
  usersResponse,
  threadsResponse,
  errorResponse,
}
