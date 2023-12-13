import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',

  initialState: {
    userInfo: { },
    isLogin: false
  },

  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload
    },
    // 修改用户登录状态
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },

    clearUserInfo : (state, { payload }) => {
      state.userInfo = {}
    }
  }
})

export const { initUserInfo, changeLoginStatus, clearUserInfo } = homeSlice.actions

export default homeSlice.reducer
