import type { LoginInputs, ThreadDetail, VoteType } from '@/types'
import { getSession } from 'next-auth/react'

const api = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_FORUM_API as string

  interface FetchOptions {
    method: 'GET' | 'POST'
    headers: {
      'Content-Type': 'application/json'
    }
    body: string
  }

  async function fetchWithAuth(
    url: string,
    options: Partial<FetchOptions> = {},
  ) {
    const session = await getSession()
    const getAccessTokenFromSession = session?.user.accessToken
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessTokenFromSession}`,
      },
    })
  }

  interface Register {
    name: string
    email: string
    password: string
  }

  async function register({ name, email, password }: Partial<Register>) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const responseJson = await response.json()
    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { user },
    } = responseJson

    return user
  }

  async function login({ email, password }: LoginInputs): Promise<any> {
    try {
      const body = JSON.stringify({ email, password })
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async function getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    return responseJson
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { users },
    } = responseJson

    return users
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { threads },
    } = responseJson

    return threads
  }

  async function getDetailThread(id: string) {
    const response = await fetch(`${BASE_URL}/threads/${id}`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { detailThread },
    } = responseJson

    return detailThread
  }

  async function createThread({
    title,
    body,
    category,
  }: Partial<ThreadDetail>) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    })

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { thread },
    } = responseJson

    return thread
  }

  async function createComment(content: string, threadId: string) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    )

    const responseJson = await response.json()

    const {
      status,
      message,
      data: { comment },
    } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    return comment
  }

  async function addThreadVote(threadId: string, voteType: string) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const responseJson = await response.json()

    const {
      status,
      message,
      data: { vote },
    } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    return vote
  }

  async function addCommentVote(
    threadId: string,
    commentId: string,
    voteType: VoteType,
  ) {
    const response = await fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const responseJson = await response.json()

    const {
      status,
      message,
      data: { vote },
    } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    return vote
  }

  async function getLeaderboard() {
    const response = await fetchWithAuth(`${BASE_URL}/leaderboards`)

    const responseJson = await response.json()

    const { status, message } = responseJson

    if (status !== 'success') {
      throw new Error(message)
    }

    const {
      data: { leaderboards },
    } = responseJson

    return leaderboards
  }
  // #endregion Leaderboard

  return {
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getDetailThread,
    createThread,
    createComment,
    addThreadVote,
    addCommentVote,
    getLeaderboard,
  }
})()

export default api
