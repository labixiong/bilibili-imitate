import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reDefine'
import { getChannelListAsync } from '../../store/homeSlice'
import { ValidateChannel } from '../../types/ValidateApi'

import styles from '../../styles/scoped/channel.module.scss'
import EntryItem from '../../components/EntryItem'

export default function Channel() {

  const dispatch = useAppDispatch()
  const { channelList } = useAppSelector(state => state.home)

  useEffect(() => {
    if(!channelList.length) {
      dispatch(getChannelListAsync())
    }
  }, [channelList, dispatch])

  let arr = []
  const leftChannelList = channelList.filter((item: ValidateChannel) => item.side === 'left')
  let result: ValidateChannel[] = channelList.filter((item: ValidateChannel) => item.side === 'center')
  const rightChannelList = channelList.filter((item: ValidateChannel) => item.side === 'right')

  for (let i = 0; i < 4; i++) {
    result = result.map((item: ValidateChannel) => {
      return {
        ...item,
        _id: item._id + i
      }
    })
    arr.push(result)
  }
  
  let centerChannelList: ValidateChannel[] = arr.flat(Infinity) as ValidateChannel[]
  

  return (
    <div className={styles.container}>
      <div className={styles['channel-icons']}>
        {
          leftChannelList.map((item: ValidateChannel) => (<EntryItem class='title3' layout='column' dataSource={item} key={item._id}></EntryItem>))
        }
      </div>
      <div className={styles['right-channel-container']}>
        <div className={styles['channel-items__left']}>
          {
            centerChannelList.map((item) => (
            <a className={styles['channel-items__left-item']} href={item.href} key={item._id}>
              {item.title}
            </a>))
          }
        </div>
        <div className={styles['channel-items__right']}>
          {
            rightChannelList.map((item: ValidateChannel) => (<EntryItem dataSource={item} key={item._id} layout='row'></EntryItem>))
          }
        </div>
      </div>
    </div>
  )
}
