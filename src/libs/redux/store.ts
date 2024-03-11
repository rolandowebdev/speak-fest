import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authSlice from '@/libs/redux/slices/auth'
import registerSlice from '@/libs/redux/slices/register'
import profileSlice from '@/libs/redux/slices/profile'
import usersSlice from '@/libs/redux/slices/users'
import threadsSlice from '@/libs/redux/slices/get-threads'
import leaderboardsSlice from '@/libs/redux/slices/leaderboards'
import postThreadSlice from '@/libs/redux/slices/post-thread'

export const store = () => {
	return configureStore({
		reducer: {
			auth: authSlice,
			register: registerSlice,
			profile: profileSlice,
			users: usersSlice,
			threads: threadsSlice,
			leaderboards: leaderboardsSlice,
			postThread: postThreadSlice,
			loadingBar: loadingBarReducer,
		},
	})
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
