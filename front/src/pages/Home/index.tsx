import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reDefine'
import { getNavbarListAsync } from '../../store/homeSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const { navbarList } = useAppSelector(state => state.home)

  useEffect(() => {
    if(!navbarList.length) {
      dispatch(getNavbarListAsync())
    }
  }, [navbarList, dispatch])

  return (
    <div>
      {navbarList}
    </div>
  )
}
