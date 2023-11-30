import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNavbarList, getChannelList } from '../api/home'

export const getNavbarListAsync = createAsyncThunk('home/getNavbarListAsync', async (_, thunkApi) => {
  const res = await getNavbarList()
  thunkApi.dispatch(initNavbarList(res.data))
})

export const getChannelListAsync = createAsyncThunk('home/getChannelListAsync', async (_, thunkApi) => {
  const res = await getChannelList()
  thunkApi.dispatch(initChannelList(res.data))
})

const homeSlice = createSlice({
  name: 'home',

  initialState: {
    navbarList: [],
    channelList: []
  },

  reducers: {
    initNavbarList: (state, { payload }) => {
      state.navbarList = payload
    },

    initChannelList: (state, { payload }) => {
      state.channelList = payload
    }
  }
})

export const { initNavbarList, initChannelList } = homeSlice.actions

export default homeSlice.reducer
