import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNavbarList } from '../api/home'

export const getNavbarListAsync = createAsyncThunk('home/getNavbarListAsync', async (_, thunkApi) => {
  const res = await getNavbarList()
  console.log(res, 'res');
  thunkApi.dispatch(initNavbarList(res.data))
})

const homeSlice = createSlice({
  name: 'home',

  initialState: {
    navbarList: []
  },

  reducers: {
    initNavbarList: (state, { payload }) => {
      state.navbarList = payload
    }
  }
})

export const { initNavbarList } = homeSlice.actions

export default homeSlice.reducer
