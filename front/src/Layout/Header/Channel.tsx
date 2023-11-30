import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reDefine'
import { getChannelListAsync } from '../../store/homeSlice'
import { ValidateChannel } from '../../types/ValidateApi'

import styles from '../../styles/scoped/channel.module.scss'

export default function Channel() {

  const dispatch = useAppDispatch()
  const { channelList } = useAppSelector(state => state.home)

  useEffect(() => {
    if(!channelList.length) {
      dispatch(getChannelListAsync())
    }
  }, [channelList, dispatch])


  const leftChannelList = channelList.map((item: ValidateChannel) => item.side === 'left')
  const centerChannelList = channelList.map((item: ValidateChannel) => item.side === 'center')
  const rightChannelList = channelList.map((item: ValidateChannel) => item.side === 'right')

  return (
    <div className={styles.container}>
      Channel
    </div>
  )
}
