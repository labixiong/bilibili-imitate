import styles from '../../styles/scoped/postfile.module.scss'
import MenuList from './MenuList'
import Main from './Main';
import PostArticle from './PostArticle';
import PostVideo from './PostVideo';

import { useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { getItem } from '../../utils/antdUtil'
import type { MenuProps } from 'antd'


export default function PostFile() {
  const [currentKey, setCurrentKey] = useState('home')
  const dom = currentKey === 'home' ? (<Main></Main>) : currentKey === 'post-article' ? (<PostArticle></PostArticle>) : (<PostVideo></PostVideo>)
  const items: MenuProps['items'] = [
    getItem('首页', 'home', <MailOutlined />),
  
    getItem('投稿管理', 'post-manage', <AppstoreOutlined />, [
      getItem('视频投稿', 'post-video'),
      getItem('专栏投稿', 'post-article')
    ])
  ];

  function handleMenuItemClick(key: string) {
    setCurrentKey(key)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <MenuList click={handleMenuItemClick} items={items}></MenuList>
      </div>

      <div className={styles.rightSide}>
        {dom}
      </div>
    </div>
  )
}
