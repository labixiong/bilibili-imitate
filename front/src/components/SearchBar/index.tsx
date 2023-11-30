import React, { useState } from 'react'
import { Input } from 'antd'

import styles from './SearchBar.module.scss'


export default function SearchBar() {

  const [isShowPanel, setIsShowPanel] = useState(false)

  return (
    <div className={styles.container}>
      {/* <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
        className={styles['search-form']}
      >
        <Form.Item>
          <Input.Search enterButton placeholder='请输入内容' size='large'></Input.Search>
        </Form.Item>
      </Form> */}

      <div className={styles['search-form']}>
        <Input.Search enterButton placeholder='请输入内容' size='large' onFocus={() => setIsShowPanel(true)} onBlur={() => setIsShowPanel(false)}></Input.Search>
      </div>

      <div
        style={{ display: isShowPanel ? 'block': 'none' }}
        className={styles['search-panel']}
      >
        szfgsrthdr
      </div>
    </div>
  )
}
