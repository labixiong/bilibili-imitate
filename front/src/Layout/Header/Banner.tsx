import React from 'react'
import styles from '../../styles/scoped/banner.module.scss'

export default function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles['animated-banner']}></div>
      <div className={styles['header-banner__inner']}></div>
      <div className={styles['taper-line']}></div>
    </div>
  )
}
