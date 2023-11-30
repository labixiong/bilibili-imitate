import PropTypes from 'prop-types'
import styles from './entryItem.module.scss'

import { ValidateProps } from '../../types/ValiteProps'

/**
 * navbar及banner区域的每一个入口小标题
 */
export default function EntryItem(props: ValidateProps) {
  return (
    <div className={styles.container}>
      <a href={props.dataSource.href} className={styles.title}>
        <div className={styles.icon}></div>
        <span >{props.dataSource.title}</span>
      </a>
    </div>
  )
}

EntryItem.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.string)
}
