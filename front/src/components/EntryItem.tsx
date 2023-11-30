import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/scoped/home.module.css'

import { ValidateProps } from '../types/ValiteProps'

/**
 * navbar及banner区域的每一个入口小标题
 */
export default function EntryItem(props: ValidateProps) {
  return (
    <div className='entry-item__container'>
      <a href={props.dataSource.href} className='entry-item__title'>
        <div></div>
        <span>{props.dataSource.title}</span>
      </a>
    </div>
  )
}

EntryItem.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.string)
}
