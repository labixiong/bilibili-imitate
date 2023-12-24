import { SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reDefine'
import { getNavbarListAsync } from '../../store/homeSlice'
import { Button, Modal, message } from 'antd'
import { ValidateNavbar } from '../../types/ValidateApi'
import { UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import SearchBar from '../../components/SearchBar'
import EntryItem from '../../components/EntryItem/index'
import styles from '../../styles/scoped/navbar.module.scss'
import LoginAvatar from '../../components/LoginAvatar'

export default function Home() {
  const dispatch = useAppDispatch()
  const { navbarList } = useAppSelector(state => state.home)
  const { isLogin, userInfo } = useAppSelector(state => state.user)
  const [isModalOpen, setIsShowOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(!navbarList.length) {
      dispatch(getNavbarListAsync())
    }
  }, [navbarList, dispatch])

  const leftList = navbarList.filter((item: ValidateNavbar) => item.side === 'left')
  const rightList = navbarList.filter((item: ValidateNavbar) => item.side === 'right')

  const leftNodeList = leftList.map((item: ValidateNavbar, index: number) => (
    <EntryItem
      click={(item: ValidateNavbar, e: SyntheticEvent) => handleNavbarItemClick(item, e)}
      dataSource={item} key={item._id}
    />
  ))
  const rightNodeList = rightList.map((item: ValidateNavbar) => (
    <EntryItem layout='column' dataSource={item} key={item._id} />
  ))

  // 投稿
  function handleSubmit() {
    // 由内部展示跳转到另一个页面
    // navigate('/postfile')
    if(isLogin) {
      window.open('http://localhost:8080/')
    } else {
      message.warning('请先登录！')
      setShowLogin(true)
    }
  }

  function handleNavbarItemClick(item: ValidateNavbar, e: SyntheticEvent): void {
    if(item.title === '首页') {
      navigate('/')
    } else if(item.title === '会员购') {
      navigate('/purchase')
    }
  }

  // 取消展示login登录弹框
  function handleCancelLogin(value: boolean) {
    setShowLogin(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles['left-entry']}>
        {leftNodeList}
      </div>
      <div className={styles['center-search-container']}>
        <SearchBar></SearchBar>
      </div>
      <div className={styles['right-entry']}>
        <LoginAvatar show={showLogin} cancel={handleCancelLogin}></LoginAvatar>
        {rightNodeList}
      </div>
      <div>
        <Button type="primary" icon={<UploadOutlined />} size='large' onClick={handleSubmit}>投稿</Button>
      </div>

      {/* 登录弹框 */}
      <Modal title="Basic Modal" footer={false} open={isModalOpen} onOk={() => setIsShowOpen(false)} onCancel={() => setIsShowOpen(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}
