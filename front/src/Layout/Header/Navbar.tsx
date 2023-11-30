import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reDefine'
import { getNavbarListAsync } from '../../store/homeSlice'
// import { Input } from 'antd'
import { ValidateNavbar } from '../../types/ValidateApi'

import SearchBar from '../../components/SearchBar'
import EntryItem from '../../components/EntryItem/index'
import styles from '../../styles/scoped/navbar.module.scss'

export default function Home() {
  const dispatch = useAppDispatch()
  const { navbarList } = useAppSelector(state => state.home)

  useEffect(() => {
    if(!navbarList.length) {
      dispatch(getNavbarListAsync())
    }
  }, [navbarList, dispatch])

  const leftList = navbarList.filter((item: ValidateNavbar) => item.side === 'left')
  const rightList = navbarList.filter((item: ValidateNavbar) => item.side === 'right')


  /**
   * 搜索框聚焦事件
   */
  function handleInputFocus() {}

  return (
    <div className={styles.container}>
      <div className={styles['left-entry']}>
        {
          leftList.map((item: ValidateNavbar) => (<EntryItem dataSource={item} key={item._id} />))
        }
      </div>
      <div className={styles['center-search-container']}>
        <SearchBar></SearchBar>
        {/* <Input.Search placeholder='请输入内容' enterButton onFocus={handleInputFocus}></Input.Search> */}
      </div>
      <div className={styles['right-entry']}>
        {
          rightList.map((item: ValidateNavbar) => (<EntryItem dataSource={item} key={item._id} />))
        }
      </div>
    </div>
  )
}
