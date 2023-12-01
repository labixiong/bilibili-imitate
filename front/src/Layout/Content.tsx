import styles from '../styles/scoped/content.module.scss'

export default function Content(props: any) {
  return (
    <main className={styles.container}>
      {props.children}
    </main>
  )
}
