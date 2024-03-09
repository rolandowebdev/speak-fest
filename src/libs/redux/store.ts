import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/libs/redux/slices/auth'
import registerSlice from '@/libs/redux/slices/register'
import profileSlice from '@/libs/redux/slices/profile'

export const store = () => {
	return configureStore({
		reducer: {
			auth: authSlice,
			register: registerSlice,
			profile: profileSlice,
		},
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
