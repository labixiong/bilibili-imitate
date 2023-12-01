import PropTypes from 'prop-types'
import styles from './EntryItem.module.scss'

import { ValidateProps } from '../../types/ValiteProps'
import { SyntheticEvent, useEffect, useState } from 'react'

/**
 * navbar及banner区域的每一个入口小标题
 */
export default function EntryItem(props: ValidateProps) {

  const [isShowIcon, setIsShowIcon] = useState(true)

  useEffect(() => {
    if(props.dataSource.icon) {
      setIsShowIcon(true)
    }
  }, [props.dataSource.icon])

  function handleClick(e: SyntheticEvent): void {
    props.click(props.dataSource, e)
  }

  return (
    <div className={styles.container} onClick={(e: SyntheticEvent) => handleClick(e)}>
      <a href={props.dataSource.href} className={props.class ? styles[props.class] : props.layout === 'row' ? styles.title : styles.title2} style={{ flexDirection: props.layout }}>
        <div style={{ visibility: isShowIcon ? 'visible' : 'hidden' }} className={styles.icon}>
          i
        </div>
        <span >{props.dataSource.title}</span>
      </a>
    </div>
  )
}

EntryItem.defaultProps = {
  layout: 'row'
}

EntryItem.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.string)
}
