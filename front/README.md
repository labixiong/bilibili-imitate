# issues

## 父子组件传值问题

> 当父子组件都用 useState hook时，子组件向父组件传值时使用setState存起来的值再抛给父组件时，父组件获取值错误，获取到的不是当前的值而是上一次点击的值，头次点击不会改变值

> 子组件 -- `src/pages/PostFile/MenuList.tsx`  父组件 -- `src/pages/PostFile/index.tsx`

场景复现：

```js

// src/pages/PostFile/MenuList.tsx
// ... 其余代码省略

const MenuList = (props: { [propName: string]: any }) => {
  const [currentKey, setCurrentKey] = useState('home')
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key)
    // 如果props.click传的值是currentKey的话 就会出现父组件获取值错误的问题
    props.click(e.key)
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={[currentKey]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuList;


// src/pages/PostFile/index.tsx
import { useState } from 'react';
import styles from '../../styles/scoped/postfile.module.scss'
import MenuList from './MenuList'

export default function PostFile() {
  const [key, setKey] = useState('home')

  function handleMenuItemClick(e: string) {
    setKey(e)
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <MenuList click={handleMenuItemClick}></MenuList>
      </div>

      <div className={styles.rightSide}>
        {key}
      </div>
    </div>
  )
}

```
