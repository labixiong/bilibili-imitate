import React, { useState } from 'react';
import type { MenuProps } from 'antd'
import { Menu } from 'antd';


const MenuList = (props: { [propName: string]: any }) => {
  const [currentKey, setCurrentKey] = useState('home')
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentKey(e.key)
    props.click(e.key)
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={[currentKey]}
      mode="inline"
      items={props.items}
    />
  );
};

export default MenuList;