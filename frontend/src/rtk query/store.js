import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { plantApi } from './slice'

export const store = configureStore({
  reducer: {
    [plantApi.reducerPath]: plantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantApi.middleware),
})

setupListeners(store.dispatch)