import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',

  initialState: {
    userInfo: null
  },

  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload
    }
  }
})

export const { initUserInfo } = homeSlice.actions

export default homeSlice.reducer
