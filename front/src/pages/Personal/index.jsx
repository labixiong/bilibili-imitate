import React from 'react'
import { useAppSelector } from '../../hooks/reDefine'

export default function Personal() {
  const { userInfo } = useAppSelector(state => state.user)
  console.log(userInfo, 'userInfo');
  return (
    <div>
      <video src='/static/' crossOrigin='anonymous' preload='auto' controls autoPlay></video>
    </div>
  )
}
