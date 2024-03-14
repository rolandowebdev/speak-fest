import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authSlice from './slices/auth'
import threadsSlice from './slices/threads'
import threadDetailSlice from './slices/thread-detail'
import leaderboardSlice from './slices/leaderboard'
import usersSlice from './slices/users'
import profileSlice from './slices/profile'
import resgiterSlice from './slices/register'

export const store = () => {
	return configureStore({
		reducer: {
			auth: authSlice,
			threads: threadsSlice,
			threadDetail: threadDetailSlice,
			leaderboard: leaderboardSlice,
			users: usersSlice,
			profile: profileSlice,
			register: resgiterSlice,
			loadingBar: loadingBarReducer,
		},
	})
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
